
import './Reset.css'
// import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {useEffect} from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ResetPassword = () => {

  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message,setmessage]=useState('');
  const navigate=useNavigate();



  useEffect(()=>{
    // console.log(token);
  },[token]);
  


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      setmessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("/api/auth/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful !!");
        setmessage("Password reset successfully!!");
       navigate('/signin');
      } else {
        alert("Link is not valid to reset Password!!",data.message);
        setmessage("Link is not valid to reset Password!!",data.message);
      }
    } catch (error) {
      
      alert("Something went wrong. Please try again.",error);
      setmessage("Something went wrong. Please try again.",error);
    }
  };

  return (
   <div className="mainreset">
     <div className='reset'>
      <h2>Reset Password</h2>
      <p style={{color:"red",marginBottom:"1rem"}}>This Link is valid for only <b>5 Minutes</b> </p>
      <form onSubmit={handleSubmit}>
        
        <div className="password-container"> 
                                   <input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="New Password"
                                       id="password"
                                       value={password}
                                       onChange={(e) => setPassword(e.target.value)}
                                   />
                                   <FaEye 
                                       className={`eye-icon ${showPassword ? "hide" : ""}`} 
                                       onClick={() => setShowPassword(!showPassword)} 
                                   />
                                   <FaEyeSlash 
                                       className={`eye-icon ${showPassword ? "" : "hide"}`} 
                                       onClick={() => setShowPassword(!showPassword)} 
                                   />
                               </div>
                               <div className="password-container">
                               <input
                                       type={showPassword ? "text" : "password"}
                                       placeholder="Confirm new password"
                                       value={confirmPassword}
                                       id="confirm"
                                       onChange={(e) => setConfirmPassword(e.target.value)}
                                   />
                                   <FaEye 
                                       className={`eye-icon ${showPassword ? "hide" : ""}`} 
                                       onClick={() => setShowPassword(!showPassword)} 
                                   />
                                   <FaEyeSlash 
                                       className={`eye-icon ${showPassword ? "" : "hide"}`} 
                                       onClick={() => setShowPassword(!showPassword)} 
                                   />
                               </div>
        <div className="resendtimer">
        <Link to="/forgotPassword">
            <p  className="resend" >Resend Link</p>
            </Link>
            
           
       

        </div> 
        
        <button type="submit" className='resetbtn'>Reset Password</button>
        <p style={{color:"red"}}>{message}</p>
      </form>
      
    </div>
   </div>
  );
};

export default ResetPassword;