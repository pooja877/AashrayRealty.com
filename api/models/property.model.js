import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
   propertyName:{
    type:String,
    required:true
   },
   propertyType:{
    type:String,
    required:true
   },
   transactionType:{
      type:String,
      required:true
     },
   areaSqft:{
    type:Number,
    required:true
   },
   desc:{
    type:String,
    required:true
   },
   amenities:{
    type:String,
    required:true
   },
   bedrooms:{
    type:Number,
    required:true
   },
   bathrooms:{
    type:Number,
    required:true
   },
   // imageUrls:{
   //    type:Array,
   //    required:true,
   // },
   images:[{
      url:String,
      publicId:String
   }],
   price:{
    type:Number,
    required:true
   },
   discountPrice:{
    type:Number,
    required:true
   },
   houseno:{
      type:Number,
      required:true
   },
   buildingName:{
    type:String,
    
   },
   streetName:{
    type:String,
    required:true
   },
   area:{
    type:String,
    required:true
   },
   city:{
    type:String,
    required:true
   },
   latitude: Number, 
    longitude: Number

},
{timestamps:true});

const Property = mongoose.model('Property', propertySchema);
export default Property;
// import mongoose from 'mongoose';

// const propertySchema = new mongoose.Schema({
//    propertyName: {
//       type: String,
//       required: true
//    },
//    propertyType: {
//       type: String, // Example: "Residential", "Commercial", "Apartment"
//       required: true
//    },
//    transactionType: {
//       type: String, // Example: "Sale", "Rent"
//       required: true
//    },
//    bhk: {
//       type: String, // Example: "1BHK", "2BHK", "3BHK"
//       required: true
//    },
//    floor: {
//       type: Number, // Example: Floor number
//       required: true
//    },
//    areaSqft: {
//       type: Number, // Square feet area
//       required: true
//    },
//    desc: {
//       type: String, // Description
//       required: true
//    },
//    amenities: {
//       type: [String], //  array of amenities
//       required: true
//    },
//    bedrooms: {
//       type: Number,
//       required: true
//    },
//    bathrooms: {
//       type: Number,
//       required: true
//    },
//    furnished: {
//       type: Boolean, // ✅ True for furnished, False for unfurnished
//       required: true
//    },
//    parking: {
//       type: Boolean, // ✅ True for parking available, False for no parking
//       required: true
//    },
//    imageUrls: [{
//       url: String,
//       publicId: String
//    }],
//    price: {
//       type: Number,
//       required: true
//    },
//    discountPrice: {
//       type: Number
//    },
//    address: {
//       type: String, // ✅ Combined house no, street, building into one field
//       required: true
//    },
//    city: {
//       type: String,
//       required: true
//    },
//    state: {
//       type: String,
//       required: true
//    },
//    latitude: Number,
//    longitude: Number
// }, 
// { timestamps: true });

// const Property = mongoose.model('Property', propertySchema);
// export default Property;
