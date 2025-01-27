// server/routes/adminRoutes.js
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD=process.env.ADMIN_PASSWORD;
const ADMIN_PASSWORD_HASH = bcryptjs.hashSync(ADMIN_PASSWORD,10);
const ADMIN_PASSWORD_HASH1 = bcryptjs.hashSync(process.env.ADMIN_PASSWORD1,10);
const JWT_SECRET = process.env.JWT_SECRET;

// Admin Login Route
export const adminLogin=async (req,res,next)=>{
    const { email, password } = req.body;
  try{
    if (email === ADMIN_EMAIL ) {
        const isMatch = await bcryptjs.compare(password, ADMIN_PASSWORD_HASH);
        if (isMatch) {
            const token = jwt.sign({ role: 'admin' },JWT_SECRET);
            return res.json({ token });
        }
    }
     if (email === process.env.ADMIN_EMAIL1 ) {
      const isMatch = await bcryptjs.compare(password, ADMIN_PASSWORD_HASH1);
      if (isMatch) {
          const token = jwt.sign({ role: 'admin' },JWT_SECRET);
          return res.json({ token });
      }
  }
  if(email!==process.env.ADMIN_EMAIL1&& email!==ADMIN_EMAIL)
  {
      return res.status(400).json({message:'login email and password is not Provided!!'})
  }
  }
  catch(error)
  {
    next(error);
  }
}