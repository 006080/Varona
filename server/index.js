// ===============Express Server=============

import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import Review from './Models/Review.js';
import Feedback from './Models/Feedback.js';
// import User from '../Models/User.js'; // Uncomment if needed
// import { Server } from 'socket.io'; // Uncomment if needed
import http from 'http';
import sanitizeHtml from 'sanitize-html';
import helmet from 'helmet';
import nodemailer from 'nodemailer';
import Joi from 'joi';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


const app = express();
const server = http.createServer(app);

// Load environment variables
dotenv.config({ path: './.env.local' });

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', true); 
} else {
    app.set('trust proxy', false); 
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'reviews', 
        allowed_formats: ['jpg', 'jpeg', 'png'],
        // transformation: [{ width: 1000, height: 1000, crop: 'limit' }], 
    }, 
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
            return cb(new Error('Please upload an image file'), false);
        }
        cb(null, true);
    }
});


const { 
    MONGO_URI, 
    PORT, 
    FRONTEND_URL_LOCAL, 
    FRONTEND_URL_PROD,
    EMAIL_USER,
    EMAIL_PASS,
    RECAPTCHA_SECRET_KEY
} = process.env;


if (!MONGO_URI || !PORT || !FRONTEND_URL_LOCAL || !FRONTEND_URL_PROD || !EMAIL_USER || !EMAIL_PASS || !RECAPTCHA_SECRET_KEY) {
    console.error('Missing required environment variables');
    process.exit(1);
}

const reviewLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 30, // 3 reviews per IP
    message: 'Too many reviews submitted. Please try again later.'
});

const feedbackLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, // 1 hour
    max: 100, // 3 reviews per IP
    message: 'Too many feedbacks submitted. Please try again later.'
});

// Middleware
app.use("/api/feedback", feedbackLimiter);

app.use(helmet()); 

app.use(express.json({ limit: '10mb' })); // Limit payload size
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [FRONTEND_URL_LOCAL, FRONTEND_URL_PROD, ];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

const feedbackSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    surname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10,15}$/).allow(""),
    message: Joi.string().min(10).max(1000).required(),
    captchaToken: Joi.string().required(),
    terms: Joi.string().valid("yes").required() 
  });


async function verifyCaptcha(token) {
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const data = await response.json();
    return data.success;
  }

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });


// MongoDB Connection
mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // setupChangeStream();
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });


app.post("/api/feedback", async (req, res) => {
    const { name, surname, email, phone, message, captchaToken, terms } = req.body;
  
    const { error } = feedbackSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
  
    if (terms !== "yes") {
        return res.status(400).json({ message: "You must agree to the terms." });
      }

    const captchaValid = await verifyCaptcha(captchaToken);
    if (!captchaValid)
      return res.status(400).json({ message: "reCAPTCHA error. Please try again." });
  
    const sanitizedMessage = sanitizeHtml(message, {
      allowedTags: [],
      allowedAttributes: {},
    });
  
    try {
      const feedback = new Feedback({ name, surname, email, phone, message });
      await feedback.save();

      const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name} ${surname}`,
        text: `
          Name: ${name}
          Surname: ${surname}
          Email: ${email}
          Phone: ${phone || "not provided"}
          Message:
          ${sanitizedMessage}
        `,
      };
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Message sent successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error." });
    }
  });


app.post('/api/reviews', reviewLimiter, upload.single('image'), async (req, res) => { 
    try {
        const { name, rating, message } = req.body;

        if (!name || !rating || !message) {
            return res.status(400).json({ 
                error: 'Name, rating, and message are required' 
            });
        }

        const numericRating = Number(rating);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            return res.status(400).json({ 
                error: 'Rating must be a number between 1 and 5' 
            });
        }

        // Sanitize inputs
        const sanitizedMessage = sanitizeHtml(message, {
            allowedTags: [],
            allowedAttributes: {}
        });

        const imageUrl = req.file ? req.file.path : null;

        const newReview = new Review({
            name: name.trim(),
            rating: numericRating,
            message: sanitizedMessage.trim(),
            image: imageUrl,
            approved: false,
            ipAddress: req.ip,
            // userAgent: req.get('user-agent')
        });

        const savedReview = await newReview.save();

        // Remove sensitive data from response
        const responseReview = {
            id: savedReview._id,
            name: savedReview.name,
            rating: savedReview.rating,
            message: savedReview.message,
            image: savedReview.image,
            createdAt: savedReview.createdAt
        };

        res.status(201).json({
            success: true,
            message: 'Review submitted successfully and pending approval',
            data: responseReview
        });

    } catch (error) {
        console.error('Error submitting review:', error);
        
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ 
                error: `File upload error: ${error.message}` 
            });
        }

        if (error.message && error.message.includes('file size')) {
            return res.status(400).json({ 
                error: 'File size too large. Please upload an image less than 5MB.' 
            });
        }

        if (error.message && error.message.includes('cloudinary')) {
            return res.status(400).json({ 
                error: 'Image upload failed. Please try again with a different image.' 
            });
        }

        res.status(500).json({ 
            error: 'Failed to submit review. Please try again later.' 
        });
    }
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        return res.status(400).json({
            error: `Upload error: ${error.message}`
        });
    }
    next(error);
});


app.get('/api/reviews', async (req, res) => {
    try {
        const reviews = await Review.find({ approved: true })
            .select('-ipAddress -userAgent')
            .sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});



server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

function shutdown() {
    console.log('Shutting down gracefully...');
    server.close(() => {
        mongoose.connection.close(false, () => {
            console.log('Server and MongoDB connection closed');
            process.exit(0);
        });
    });
}





// ===============Adapted Express Server for Vercel=============

// import express from 'express';
// import mongoose from 'mongoose';
// import multer from 'multer';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';
// import Review from '../Models/Review';
// // import User from '../Models/User'; // Uncomment if needed
// // import { Server } from 'socket.io'; // Uncomment if needed
// import sanitizeHtml from 'sanitize-html';
// // import helmet from 'helmet';
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';


// const app = express();

// // Load environment variables
// dotenv.config({ path: './.env.local' });

// // Vercel specific
// app.set('trust proxy', true);

// // Rest of your configurations...
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: 'reviews', 
//         allowed_formats: ['jpg', 'jpeg', 'png'],
//     }, 
// });

// const upload = multer({
//     storage,
//     limits: {
//         fileSize: 10 * 1024 * 1024
//     },
//     fileFilter: (req, file, cb) => {
//         if (!file.mimetype.startsWith('image/')) {
//             return cb(new Error('Please upload an image file'), false);
//         }
//         cb(null, true);
//     }
// });

// const { 
//     MONGO_URI, 
//     FRONTEND_URL_LOCAL,
//     FRONTEND_URL_PROD
// } = process.env;

// if (!MONGO_URI || !FRONTEND_URL_LOCAL || !FRONTEND_URL_PROD) {
//     console.error('Missing required environment variables');
//     process.exit(1);
// }

// const reviewLimiter = rateLimit({
//     windowMs: 60 * 60 * 1000,
//     max: 300,
//     message: 'Too many reviews submitted. Please try again later.'
// });

// // Middleware
// app.use(express.json({ limit: '10mb' }));
// app.use(cors({
//     origin: (origin, callback) => {
//         const allowedOrigins = [
//             FRONTEND_URL_LOCAL, 
//             FRONTEND_URL_PROD,
//             'https://www.nataliyarodionova.com',
//             'http://varona.vercel.app'
//             ];
//         if (!origin || allowedOrigins.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true
// }));

// // MongoDB Connection
// let cachedConnection = null;

// async function connectToDatabase() {
//     if (cachedConnection) {
//         return cachedConnection;
//     }

//     cachedConnection = await mongoose.connect(MONGO_URI);
//     return cachedConnection;
// }

// // Routes
// app.post('/api/reviews', reviewLimiter, upload.single('image'), async (req, res) => { 
//     try {
//         await connectToDatabase();
//         const { name, rating, message } = req.body;

//         if (!name || !rating || !message) {
//             return res.status(400).json({ 
//                 error: 'Name, rating, and message are required' 
//             });
//         }

//         const numericRating = Number(rating);
//         if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
//             return res.status(400).json({ 
//                 error: 'Rating must be a number between 1 and 5' 
//             });
//         }

//         // Sanitize inputs
//         const sanitizedMessage = sanitizeHtml(message, {
//             allowedTags: [],
//             allowedAttributes: {}
//         });

//         const imageUrl = req.file ? req.file.path : null;

//         const newReview = new Review({
//             name: name.trim(),
//             rating: numericRating,
//             message: sanitizedMessage.trim(),
//             image: imageUrl,
//             approved: false,
//             ipAddress: req.ip,
//             // userAgent: req.get('user-agent')
//         });

//         const savedReview = await newReview.save();

//         // Remove sensitive data from response
//         const responseReview = {
//             id: savedReview._id,
//             name: savedReview.name,
//             rating: savedReview.rating,
//             message: savedReview.message,
//             image: savedReview.image,
//             createdAt: savedReview.createdAt
//         };

//         res.status(201).json({
//             success: true,
//             message: 'Review submitted successfully and pending approval',
//             data: responseReview
//         });

//     } catch (error) {
//         console.error('Error submitting review:', error);
        
//         if (error instanceof multer.MulterError) {
//             return res.status(400).json({ 
//                 error: `File upload error: ${error.message}` 
//             });
//         }

//         if (error.message && error.message.includes('file size')) {
//             return res.status(400).json({ 
//                 error: 'File size too large. Please upload an image less than 5MB.' 
//             });
//         }

//         if (error.message && error.message.includes('cloudinary')) {
//             return res.status(400).json({ 
//                 error: 'Image upload failed. Please try again with a different image.' 
//             });
//         }

//         res.status(500).json({ 
//             error: 'Failed to submit review. Please try again later.' 
//         });
//     }
// });

// app.get('/api/reviews', async (req, res) => {
//     try {
//         await connectToDatabase();
//         const reviews = await Review.find({ approved: true })
//             .select('-ipAddress -userAgent')
//             .sort({ createdAt: -1 });
//         res.status(200).json(reviews);
//     } catch (error) {
//         console.error('Error fetching reviews:', error);
//         res.status(500).json({ error: 'Failed to fetch reviews' });
//     }
// });


// app.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         return res.status(400).json({
//             error: `Upload error: ${error.message}`
//         });
//     }
//     next(error);
// });

// app.use((req, res) => {
//     res.status(404).json({ error: 'Endpoint not found' });
// });

// app.use((err, req, res, next) => {
//     console.error('Server error:', err);
//     res.status(500).json({ error: 'Internal server error' });
// });


// export default app; 
