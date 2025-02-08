import Property from "../models/property.model.js";
import cloudinary from "../cloudinary.js";
// Upload Property Images to Cloudinary
export const uploadImage=async (req, res) => {
  try {
    const uploadedImages = [];
    
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
      uploadedImages.push({url:result.secure_url,
            publicId:result.public_id,
      });
    }
    res.json({ images: uploadedImages });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteImage=async (req,res)=>{
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(400).json({ error: "Failed to delete image" });
    }

    res.json({ message: "Image deleted successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

export const addProperty=async (req,res,next)=>{
 
  const {images,
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
    
      const newProperty = new Property({ images,
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