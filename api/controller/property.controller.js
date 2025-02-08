import Property from "../models/property.model.js";
import cloudinary from "../cloudinary.js";
// Upload Property Images to Cloudinary
export const uploadImage=async (req, res) => {
  try {
    const imageUrls = [];
    
    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "aashray_images/" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });
      imageUrls.push(result.secure_url);
    }
    res.json({ urls: imageUrls });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export const addProperty=async (req,res,next)=>{
 
  const {imageUrls,
    propertyName,
    propertyType,
    transactionType,
    areaSqft,
    desc,
    amenities,
    bedrooms,
    bathrooms,
    price,
    discountPrice,
    houseno,
    buildingName,
    streetName,
    area,
    city}=req.body;

  try{
    
      const newProperty = new Property({ imageUrls,
    propertyName,
    propertyType,
    transactionType,
    areaSqft,
    desc,
    amenities,
    bedrooms,
    bathrooms,
    price,
    discountPrice,
    houseno,
    buildingName,
    streetName,
    area,
    city,}); 
      await newProperty.save();
      res.status(201).json({ message: "Property added successfully!" });
    }
    catch(error)
    {
        next(error);
    }
}