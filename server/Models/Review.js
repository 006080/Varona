import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxLength: 1000
    },
    image: {
        type: String, 
        default: null
    },
    approved: {
        type: Boolean,
        default: false
    },
    ipAddress: String,
    userAgent: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


export default mongoose.model('Review', reviewSchema);