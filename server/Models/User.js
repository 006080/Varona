import mongoose from 'mongoose';

// Define a schema for the User model
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, request: true },
    email: { type: String, required: true, unique: true },
    message: { type: String, required: true },
    terms: { type:String, require: true}
});

// Create the User model
export default mongoose.model('User', userSchema);