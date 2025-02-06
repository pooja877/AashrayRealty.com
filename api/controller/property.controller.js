import multer from 'multer'
import cloudinary from 'cloudinary'
import Property from "../models/property.model.js";

cloudinary.config({
    cloud_name: "your_cloud_name",
    api_key: "your_api_key",
    api_secret: "your_api_secret",
  });

  // Multer Storage (Temporary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const addProperty=async (req,res,next)=>{
    try{
        upload.array('images');
         // Upload images to Cloudinary and get URLs
    const imageUploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload_stream({ folder: "listings" }, (error, result) => {
          if (error) throw new Error("Cloudinary upload failed");
          return result.secure_url;
        }).end(file.buffer)
      );
  
      const imageUrls = await Promise.all(imageUploadPromises);
        const property=await Property.create(...req.body,imageUrls);
        return res.status(201).json(property);
    }
    catch(error)
    {
        next(error);
    }
}