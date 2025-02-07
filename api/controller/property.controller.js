import Property from "../models/property.model.js";

import cloudinary from 'cloudinary'
// Upload Property Images to Cloudinary
export const uploadImage=async (req, res) => {
  try {
    const imageUrls = [];

    for (const file of req.files) {
      const result = await new Promise((resolve, reject) => {
        cloudinary
        .uploader.upload_stream(
          { folder: "aashray_images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(file.buffer);
      });

      imageUrls.push(result.secure_url);
    }

    res.json({ urls: imageUrls });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export const addProperty=async (req,res,next)=>{
    try{
        
        const newProperty = new Property(...req.body );
        await newProperty.save();
    
        // const property=await Property.create(...req.body);
        return res.status(201).json(newProperty);
    }
    catch(error)
    {
        next(error);
    }
}