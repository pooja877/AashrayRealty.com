
import Contact from "../models/contact.model.js";
import User from "../models/user.model.js";
import UserNotification from "../models/userNotification.model.js";
import UserProperty from "../models/userProperties.model.js";
import nodemailer from "nodemailer";
import fetch from'node-fetch';

// Create a Property Listing (User Side)
export const addProperty = async (req, res) => {
  try {
    const { userId, title, bhk, price,floor, city, area, pincode, address, images, desc, amenities, transactionType, propertyType, mobile } = req.body;
    // Validate required fields
 

    // Fetch user and check if exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update mobile number if it's not already set
    if (!user.mobile) {
      user.mobile = mobile;
      await user.save(); // Save updated user with mobile number
    }

    // Store property in UserProperty collection
    const newProperty = new UserProperty({
      userId,
      title,
      bhk,
      price,
      city,
      area,
      pincode,
      address,
      images, // Assuming images contain { url, publicId }
      desc,
      floor,
      amenities,
      transactionType,
      propertyType,
      status: "Pending",
    });

    await newProperty.save();
 
    await Contact.create({
      userId,
      category: "userUploadProperty",
      message: `${user.username} upload a property so verify the property and give the approval!!`,
    });

    res.status(201).json({ message: "Property added successfully and mobile number updated.", mobile: user.mobile });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// Get All Properties (Admin)
export const getAllProperties = async (req, res) => {
  try {
    const properties = await UserProperty.find(); // Fetch all properties
    res.status(200).json(properties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

// export const activateProperty = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const property = await UserProperty.findByIdAndUpdate(id, { status: "Approved" }, { new: true });

//       if (!property) {
//           return res.status(404).json({ message: "Property not found" });
//       }

//       res.status(200).json({ message: "Property approved successfully", property });
//   } catch (error) {
//       res.status(500).json({ message: "Server error", error });
//   }
// };

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
      const { id } = req.params;
      const property = await UserProperty.findByIdAndDelete(id);

      if (!property) {
          return res.status(404).json({ message: "Property not found" });
      }

      res.status(200).json({ message: "Property deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Server error", error });
  }
};

export const getApprovedProperties = async (req, res) => {
  try {
      const properties = await UserProperty.find({ status: "Approved" });
     
      res.json(properties);
  } catch (error) {
      console.error("Error fetching approved properties:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// export const togglePropertyStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const property = await UserProperty.findById(id);

//     if (!property) {
//       return res.status(404).json({ message: "Property not found" });
//     }

//     // Toggle status
//     property.status = property.status === "Pending" ? "Approved" : "Pending";

//     await property.save();
//      const newNotification = new UserNotification({
//           userId:id.userId,
//           message: `Your Proeprty is Approved by the admin now it is visible in proeprties page!!`,
//         });
    
//         // Save the notification
//         await newNotification.save();

//     res.status(200).json({ message: "Status updated", status: property.status });
//   } catch (error) {
//     console.error("Error updating property status:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };
export const togglePropertyStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await UserProperty.findById(id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Fetch the user to get their email
    const user = await User.findById(property.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle status
    property.status = property.status === "Pending" ? "Approved" : "Pending";
    
    // ✅ Save the updated status
    await property.save();

    console.log(`✅ Updated Property Status in DB: ${property.status}`); // Debug log

    // Create a notification
    const newNotification = new UserNotification({
      userId: property.userId,
      message: `Your property has been approved by the admin. Now it is visible on the properties page!`,
    });

    await newNotification.save();

    // Send email notification if property is approved
    if (property.status === "Approved") {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email, // User's email retrieved from the User model
        subject: "🎉 Your Property Has Been Approved-AashrayRealty!",
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #2c3e50;">Dear ${user.username},</h2>
            <p>We are pleased to inform you that your property listing has been <strong>approved</strong> by our admin team! 🎉</p>
            
            <h3>🔹 Property Details:</h3>
            <ul>
              <li><strong>Property Name:</strong> ${property.title}</li>
              <li><strong>Location:</strong> ${property.address},${property.area} ${property.city}</li>
              <li><strong>Status:</strong> Approved ✅</li>
            </ul>

            <p>Your property is now <strong>live</strong> and visible to potential buyers and renters on our platform.</p>

      

            <p>Thank you for choosing <strong>AashrayRealty</strong>! If you have any questions, feel free to reach out to us.</p>
            
            <p>Best regards,</p>
            <p><strong>AashrayRealty Team</strong></p>
           
          </div>
        `,  
      };

      await transporter.sendMail(mailOptions);
    }

    // ✅ Send the updated status in response
    res.status(200).json({ message: "Status updated", status: property.status });
  } catch (error) {
    console.error("❌ Error updating property status:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getPropertyStats = async (req, res) => {
  try {
    // Count Approved & Pending Properties
    const approvedCount = await UserProperty.countDocuments({ status: "Approved" });
    const pendingCount = await UserProperty.countDocuments({ status: "Pending" });

    // Count Properties Per User
    const userProperties = await UserProperty.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { _id: 0, userId: "$user._id", userName: "$user.name", count: 1 } }
    ]);

    res.status(200).json({ approvedCount, pendingCount, userProperties });
  } catch (error) {
    console.error("Error fetching property stats:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserProperties = async (req, res) => {
  try {
      const { userId } = req.params;
      
      // Fetch properties where userId matches
      const properties = await UserProperty.find({ userId });
      if (!properties.length) {
          return res.status(404).json({ success: false, message: "No properties found for this user." });
      }

      res.status(200).json({ success: true, properties });
  } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

export const updateProperty=async(req,res)=>{
  try {
    const { id } = req.params;
    const updatedProperty = await UserProperty.findByIdAndUpdate(id, req.body, {
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


export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
   
    const property = await UserProperty.findById(id);
 
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const getSingleProperty = async (req, res) => {
  try {
    const property = await UserProperty.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    // Combine address into a full address string
    const fullAddress = `${property.area}, ${property.city},${property.pincode}, Gujarat, India`.trim().replace(/\s+/g, " ");
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