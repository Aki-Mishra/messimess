import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const selectedMealSchema = new Schema({
  studentId : {
    type: Types.ObjectId,
    ref: "User",
    required: true
  },
 isEating: {
    type: Boolean,
    default: false
  },
  isSick:{
    type: Boolean,
    default: false
  },
  date:{
    type: Date,
    default: Date.now
  },
  day:{
    type: String,
    default: false
  },
  mealTime: {
    type: String,
    enum: ["breakfast", "lunch", "snacks", "dinner"]
 },
 meals:{
    type: Object,
    require: true
 }
});

const SelectedMeal = mongoose.model("SelectedMeal", selectedMealSchema);

export default SelectedMeal;