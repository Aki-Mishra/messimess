import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        
        required: [true, "name is required"],
        min: 4
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        min: 7
    }
});

// Create User model
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('User', userSchema);
export {Admin, User}