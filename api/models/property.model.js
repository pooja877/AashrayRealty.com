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
    required:true
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
   

},
{timestamps:true});

const Property = mongoose.model('Property', propertySchema);
export default Property;