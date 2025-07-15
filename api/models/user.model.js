import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile: { type: String },
    isVerified: { type: Boolean, default: false },

    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    avatar:{
        type:String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    // isVerified: { type: Boolean, default: false },
    ismobileVerified: { type: Boolean, default: false },
    
},
    {timestamps:true}
);
userSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
    const userId = this._id;
    // Property model me userId match karke delete karo
    await mongoose.model('UserProperty').deleteMany({ userId: userId });
    next();
  });

const User=mongoose.model('User',userSchema);

export default User;