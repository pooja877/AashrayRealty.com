import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    content: { type: String, required: true }, 
    image: { type: String, required: false }, 
    category: { type: String, required: false }, 
    date: { type: Date, default: Date.now }, 
}, 
{ timestamps: true });

export const News = mongoose.model("News", newsSchema);
