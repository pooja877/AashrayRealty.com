import mongoose from 'mongoose';

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
  
   // latitude: Number,
   // longitude: Number
}, 
{ timestamps: true });

const Property = mongoose.model('Property', propertySchema);
export default Property;
