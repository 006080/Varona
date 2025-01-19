import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Feedback', FeedbackSchema);