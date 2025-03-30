import Property from "../models/property.model.js";
import cloudinary from "../cloudinary.js";
import fetch from 'node-fetch';
import { notifyInterestedUsers } from "./notification.controller.js";


export const getTopRatedProperties = async (req, res) => {
  try {
    const propertiesWithRating = await Property.aggregate([
      {
        $lookup: {
          from: "reviews", // Join Review table
          localField: "_id",
          foreignField: "propertyId",
          as: "reviews",
        },
      },
      {
        $addFields: {
          avgRating: {
            $cond: {
              if: { $gt: [{ $size: "$reviews" }, 0] }, // Agar reviews hain toh calculate karo
              then: { $avg: "$reviews.rating" },
              else: 0, // Nahi toh 0 rating
            },
          },
        },
      },
      {
        $match: { avgRating: { $gte: 3 } }, // Sirf 3+ rating wale properties lo
      },
      { $sort: { avgRating: -1 } }, // Highest rating first
      { $limit: 10 }, // ✅ Sirf pehli 10 properties
    ]);

    res.status(200).json(propertiesWithRating);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

export const getSingleProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Combine address into a full address string
    const fullAddress = `${property.area}, ${property.city}, Gujarat, India`.trim().replace(/\s+/g, " ");
    const encodedAddress = encodeURIComponent(fullAddress);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];

      // Send property details along with lat/lon
      return res.status(200).json({
        ...property.toObject(),
        latitude: parseFloat(location.lat),
        longitude: parseFloat(location.lon),
      });
    }

    res.status(200).json({ ...property.toObject(), latitude: null, longitude: null });
  } catch (error) {
    res.status(500).json({ message: "Error fetching property", error });
  }
};

export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProperty=async(req,res)=>{
  try {
    const { id } = req.params;
    const updatedProperty = await Property.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export const deleteProperty = async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the property by ID
      const deletedProperty = await Property.findByIdAndDelete(id);

      if (!deletedProperty) {
          return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting property", error });
  }
};

export const getAllProperties = async (req, res) => {
  try {
    let filter = {};

    if (req.query.city) {
      filter.city = { $regex: new RegExp(`^${req.query.city}$`, "i") }; // Case-insensitive match
    }
    if (req.query.area) {
      filter.area = { $regex: new RegExp(`^${req.query.area}$`, "i") }; // Case-insensitive match
    }
    if (req.query.transactionType) {
      filter.transactionType = req.query.transactionType;
    }

    if (req.query.propertyType) {
      filter.propertyType = req.query.propertyType;
    }


    const properties = await Property.find(filter);

    const updatedProperties = await Promise.all(
      properties.map(async (property) => {
        if (property.latitude && property.longitude) {
          return property.toObject();
        }

        const fullAddress = `${property.area}, ${property.city}, Gujarat, India`.trim();
        const encodedAddress = encodeURIComponent(fullAddress);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.length > 0) {
            return {
              ...property.toObject(),
              latitude: parseFloat(data[0].lat),
              longitude: parseFloat(data[0].lon),
            };
          }
        } catch (geoError) {
          console.error("Error fetching geolocation:", geoError);
        }

        return {
          ...property.toObject(),
          latitude: null,
          longitude: null,
        };
      })
    );

    res.status(200).json(updatedProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ message: "Error fetching properties", error });
  }
};



export const allProperty = async (req, res) => {
  try {
    let filter = {};  

    if (req.query.city) {
      filter.city = { $regex: new RegExp(`^${req.query.city}$`, "i") }; // Case-insensitive match
    }
    if (req.query.area) {
      filter.area = { $regex: new RegExp(`^${req.query.area}$`, "i") }; // Case-insensitive match
    }
    if (req.query.transactionType) {
      filter.transactionType = req.query.transactionType;
    }
    if (req.query.propertyType) {
      filter.propertyType = req.query.propertyType;
    }

    const properties = await Property.find(filter);
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Error fetching properties", error });
  }
};




//Upload Property Images to Cloudinary
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
    video,
    propertyName,
    propertyType,
    transactionType,
    bhk,
    floor,
    areaSqft,
    furnished,
    desc,
    amenities,
    bedrooms,
    bathrooms,
    price,
    discountPrice,
    address,
    area,
    city}=req.body;
    

  try{
    
      const newProperty = new Property({ 
        images,
        video,
        propertyName,
        propertyType,
        transactionType,
        bhk,
        floor,
        areaSqft,
        furnished,
        desc,
        amenities,
        bedrooms,
        bathrooms,
        price,
        discountPrice,
        address,
        area,
        city}); 
        
      await newProperty.save();
      res.status(201).json({ message: "Property added successfully!" });
    }
    catch(error)
    {
        next(error);
    }
}



export const updatePropertyStatus = async (req, res) => {
  try {
    const { propertyId, status } = req.body;
    if (!propertyId || !status) {
      return res.status(400).json({ message: "Property ID and status are required" });
    }

    await Property.findByIdAndUpdate(propertyId, { status });

    if (status === "Available") {
      await notifyInterestedUsers(propertyId);
    }

    res.json({ message: `Property status updated to ${status}` });
  } catch (error) {
    console.error("Error updating property status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
