import mongoose from "mongoose";
const Database = "MessiMess"

const url = `mongodb://127.0.0.1:27017/${Database}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1/`;

mongoose.connect(url, {
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Database connection error:', err);
});
