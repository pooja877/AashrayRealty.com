import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { errorHandler } from "../utils/error.js";
import UserNotification from "../models/userNotification.model.js";

import  Contact  from "../models/contact.model.js";


export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    // console.log("Received Token:", token); // Debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded Token:", decoded); // Debugging

    // Check if user already exists
    const existingUser = await User.findOne({ email: decoded.email });
    if (existingUser) {
      return res.send(`<script>alert("Your account is already verified!"); window.location.href = "http://localhost:5173/signin";</script>`);
    }

    // Create new user
    const newUser = new User({
      username: decoded.username,
      email: decoded.email,
      password: decoded.password, // Already hashed in signup
      isVerified: true,
    });

    await newUser.save();

    res.send(`<script>alert("Your account has been created successfully! You can now sign in."); window.location.href = "http://localhost:5173/signin";</script>`);

  } catch (error) {
    console.error("Verification Error:", error);
    res.send(`<script>alert("Invalid or expired token! Please sign up again."); window.location.href = "http://localhost:5173/signin";</script>`);
  }
};


const notifySignup = async () => {
  try {
    await Contact.create({
      category: "newUser",
      message: `New User joined!!`,
    });
  } catch (error) {
    console.error("Error creating unpaid rent notification:", error);
  }
};
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
   
  try {
    // Hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10);
   await  notifySignup();

    // Generate a verification token with the user's info
    const token = jwt.sign(
      { username, email, password: hashedPassword },
      process.env.JWT_SECRET,
      { expiresIn: '10m' }
    );

    const verificationLink = `http://localhost:5173/api/auth/verify/${token}`;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify Your Email - AashrayRealty",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Verify Your Email</h2>
          <p>Click the link below to verify your email and activate your account:</p>
          <a href="${verificationLink}" style="background: #28a745; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Verify Email</a>
          <p>This link is valid for <b>10 minutes</b>.</p>
          <p>If you did not request this, please ignore this email.</p>
          <br/>
          <p>Best Regards,<br/>AashrayRealty Team</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification email sent! Check your inbox." });

  } catch (error) {
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   try {
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorHandler(404, "User not found"));
//     }

//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next(errorHandler(401, "Wrong credentials!!"));
//     }

//     const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     const { password: pass, ...resInfo } = validUser._doc;

//     res.cookie("access_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     });


//     res.status(200).json(resInfo);
//   } catch (error) {
//     next(error);
//   }
// };


export const signin=async(req,res,next)=>{
  const { email,password }=req.body;
  try{
    const validUser=await User.findOne({email});
    if(!validUser)
      {
        return next(errorHandler(404,"User not found"));
      } 
      const validPassword=bcryptjs.compareSync(password,validUser.password);
      if(!validPassword)
        {
          return next(errorHandler(401,"Wrong credentials!!"));
        }  
//        
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
        const {password:pass,...resInfo}=validUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(resInfo);
  }
  catch(error)
  {
    next(error);
  }
}

export const google=async(req,res,next)=>{
  try{
    const user=await User.findOne({email:req.body.email});
    if(user)
    {
      const token=jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password:pass, ...rest}=user._doc;
      res
      .cookie('access_token',token, {httpOnly:true})
      .status(200)
      .json(rest);
    }
    else
    {
      const generatedPassword=
        Math.random().toString(36).slice(-8)+
        Math.random().toString(36).slice(-8);
      const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
      const newUser=new User({
        username: req.body.name.split(" ").join("").toLowerCase()+Math.random().toString(36).slice(-4),
        email:req.body.email,
        password: hashedPassword,
        avatar:req.body.photo,
        isVerified:true,
       });
      await newUser.save();
      const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password:pass, ...rest}=newUser._doc;
      res
      .cookie('access_token',token,{httpOnly:true})
      .status(200)
      .json(rest);

    }
  }
  catch(error)
  {
    next(error);
  }
}



export const logout=async (req,res,next)=>{

  try{
    res.clearCookie('access_token');
    res.status(200).json('user has been logout!!');
    

  }catch(error)
  {
    next(error);
  }
}


export const forgetPassword=async (req,res)=>{
  const { email } = req.body;
  try{
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });
 

  // const secret=process.env.JWT_SECRET+user.password;
  const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'5m'});
  const resetLink = `http://localhost:5173/resetPassword/${token}`;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    // from: process.env.EMAIL_USER,
    // to: email,
    // subject: 'Password Reset',
    // text:`Click the link below to reset your password:\n\n${resetLink}\n\nThe link will expire in 10 minutes.`,

    from: process.env.EMAIL_USER,
    to: email,
    subject: "Reset Your Password - AashrayRealty",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2>Password Reset Request</h2>
        <p>You recently requested to reset your password for your AashrayRealty account.</p>
        <p>Click the link below to reset your password:</p>
        <p>This link is valid for only <b>5 minutes</b> after that you can not update your Password using this link.</p>
        <a href="${resetLink}" style="background: #007bff; color: #fff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>For any issues, contact our support team.</p>
        <br/>
        <p>Best Regards,<br/>AashrayRealty Team</p>
      </div>
    `,
  };

   await transporter.sendMail(mailOptions, (err, info) => {
    
       console.log(res);
    res.status(200).json({message:'Password reset link has been sent to your email'});
  });
  }
  catch(error)
  {
    res.status(500).json({message:`Error sending email ${error}`});
  }

};

export const reset=async (req,res)=>{
  const {token,password}=req.body;
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPassword = await bcryptjs.hashSync(password, 10);
    await User.findByIdAndUpdate(decoded.id,{password:hashedPassword});
    const newNotification = new UserNotification({
          userId:decoded.id,
          message: `Your Password Reset Successfully!!.`,
        });
    
        // Save the notification
        await newNotification.save();
   
    res.status(200).json({ message: 'Password reset successful' });
  
  } catch (error) {
    res.status(500).json({ error: "Something went wrong! invalid or expired!" });
  }
 

}
