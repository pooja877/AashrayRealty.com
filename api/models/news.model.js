import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    content: { type: String, required: true }, 
    image: { type: String, required: true }, 
    category: { type: String, required: true }, 
    date: { type: Date, default: Date.now }, 
    link:{type:String,required:false},
}, 
{ timestamps: true });

export const News = mongoose.model("News", newsSchema);
