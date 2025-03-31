import mongoose from 'mongoose';
import { notifyInterestedUsers } from '../controller/notification.controller.js';

const propertySchema = new mongoose.Schema({
   propertyName: {
      type: String,
      required: true
   },
   propertyType: {
      type: String, // Example: "Residential", "Commercial", "Apartment"
      required: true
   },
   transactionType: {
      type: String, // Example: "Sale", "Rent"
      required: true
   },
   bhk: {
      type: String, // Example: "1BHK", "2BHK", "3BHK"
   },
   floor: {
      type: String, // Example: Floor number
      required: true
   },
   areaSqft: {
      type: Number, // Square feet area
      required: true
   },
   desc: {
      type: String, // Description
      required: true
   },
   furnished: {
      type: String, // Description
      required: true
   },

   amenities: {
      type: String, //  array of amenities
      required: true
   },
   bedrooms: {
      type: Number,
      required: true
   },
   bathrooms: {
      type: Number,
      required: true
   },
   // pdf: { 
   //    url: String, 
   //    publicId: String 
   // },
   status: { 
      type: String, 
      enum: ["Available", "Booked"], 
      default: "Available" 
    },
   video: { url: String, publicId: String }, 
   images: [{
      url: String,
      publicId: String
   }],
   price: {
      type: Number,
      required: true
   },
   discountPrice: {
      type: Number
   },
   address: {
      type: String, 
      required: true
   },
   area: {
      type: String,
      required: true
   },
   city: {
      type: String,
      required: true
   },
   latitude: Number,
   longitude: Number
}, 
{ timestamps: true });

propertySchema.pre("save", async function (next) {
   if (this.isModified("status") && this.status === "Available") {
     console.log("Property Status Changed:", this.status); // 🔥 Debugging
     await notifyInterestedUsers(this._id); // Auto notify users
   }
   next();
 });
 
 
const Property = mongoose.model('Property', propertySchema);
export default Property;
