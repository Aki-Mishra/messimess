import mongoose from "mongoose";
const scheduleSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "day is required"]
    },
    mealTime: {
        type: String,
        required: [true, "mealName is required"],
        min: 4
    },

    meals: {
        type: Array,
        required: [true, "meals"],
    }
});

// Create User model
const schedule = mongoose.model('schedule', scheduleSchema);
export default schedule