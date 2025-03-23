import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import cloudinary from "../cloudinary.js";

export const getUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  res.json({ id: req.user.id, email: req.user.email });
};


export const deleteusersadmin = async (req, res) => {
  try {
      const { id } = req.params;

      // Find and delete the property by ID
      const deleteduser = await User.findByIdAndDelete(id);

      if (!deleteduser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error deleting user", error });
  }
};

export const allUsers= async (req, res) => {
  try {
    const users = await User.find(); // Fetch all properties
    res.status(200).json(users);
} catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
}
};
// export const uploadProfilePicture = async (req, res) => {
//     try {
//       const { id } = req.params;
  
      
//       // Check if file exists
//       if (!req.file) {
//         return res.status(400).json({ success: false, message: "No image uploaded." });
//       }
  
//       // Upload Image to Cloudinary
//       const result = await new Promise((resolve, reject) =>  {
//         const stream = cloudinary.uploader.upload_stream(
//         { folder: "profile_pictures/" },
//          (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         }
//         );
//         stream.end(file.buffer);
  
//           // Update User Profile with Cloudinary URL
//           const updatedUser = User.findByIdAndUpdate(
//             id,
//             { avatar: result.secure_url }, // Save URL in DB
//             { new: true }
//           );
          
  
//           if (!updatedUser) {
//             return res.status(404).json({ success: false, message: "User not found." });
//           }

  
//           res.status(200).json(updatedUser);
//         }
//       );
  
//        // Send the buffer to Cloudinary
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };
export const uploadProfilePicture = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if file exists
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image uploaded." });
    }

    // Upload Image to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "profile_pictures/" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      stream.end(req.file.buffer); // Send buffer to Cloudinary
    });

    // Update User Profile with Cloudinary URL
    // const updatedUser = await User.findByIdAndUpdate(
    //   id,
    //   { avatar: result.secure_url }, // Save Cloudinary URL in DB
    //   { new: true }
    // );
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { avatar: result.secure_url } }, // Use $set to update only avatar
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, avatar: result.secure_url, user: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

  

export const test=(req,res)=>{
    res.json({
        message:"Api is work!!"
    });
}
export const updateUser=async (req,res,next) =>{

    if(req.user.id !== req.params.id)
    {
        return next(errorHandler(401,"You can only update your own account!"));
    }
    try{
        if(req.body.password)
        {
            req.body.password=bcryptjs.hashSync(req.body.password,10);
        }
        const updateUser=await User.findByIdAndUpdate(req.params.id,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar
            }
        },{new:true});

        const {password,...rest}=updateUser._doc;
        res.status(200).json(rest);
    }
    catch(error)
    {
        next(error);
    }
}
// export const updateUser = async (req, res) => {
//     try {
//       const { username, email } = req.body;
  
//       // Ensure data is provided
//       if (!username || !email) {
//         return res.status(400).json({ message: "Username and email are required." });
//       }
  
//       const updatedUser = await User.findByIdAndUpdate(
//         req.params.id,
//         { username, email },
//         { new: true }
//       );
  
//       if (!updatedUser) {
//         return res.status(404).json({ message: "User not found." });
//       }
  
//       res.json(updatedUser);
//     } catch (error) {
//       console.error("Update Error:", error);
//       res.status(500).json({ message: "Internal server error." });
//     }
//   };
  
export const deleteUser=async(req,res,next)=>{
    if(req.user.id !== req.params.id)
        {
            return next(errorHandler(401,"You can only delete your own account!"));
        }
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been delete');
    }
    catch(error)
    {
        next(error);
    }
}

