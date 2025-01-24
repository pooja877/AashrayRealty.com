import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import { errorHandler } from "../utils/error.js";



export const signup = async(req,res,next) =>{
  const { username,email,password }=req.body;
  
  const hashedPassword=bcryptjs.hashSync(password,10);

  const newUser=new User({username,email,password: hashedPassword});

  try{
    await newUser.save();
    res.status(201).json('User created successfully!');
  }
  catch(error)
  {
    next(error);
  }
  
}

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
        const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET);
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
        avatar:req.body.photo
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
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // const secret=process.env.JWT_SECRET+user.password;
  const token=jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'10m'});
  const resetLink = `http://localhost:5173/resetPassword?${token}`;
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
    subject: 'Password Reset',
    text:`Click the link below to reset your password:\n\n${resetLink}\n\nThe link will expire in 10 minutes.`,
    //  html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`
  };

   await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.error(err);
        return res.status(500).send('Error sending email');
    }
    res.send('Password reset link has been sent to your email');
});

 
};

export const resetPassword=async (req,res)=>{
   console.log(req.body.password)
  try{
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const hashedPassword = await bcryptjs.hashSync(req.body.password, 10);
    await User.findByIdAndUpdate(userId, { password: hashedPassword })
    res.status(200).json({ message: 'Password reset successful' });
  
  } catch (error) {
    res.status(500).json({ error: "Something went wrong! invalid or expired!" });
  }
 

}
