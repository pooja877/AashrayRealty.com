
import './Reset.scss'
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
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isExpired,setIsExpired] = useState(false);


  useEffect(()=>{
    console.log(token);
  },[token]);
  
  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
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
      <form onSubmit={handleSubmit}>
        {/* <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />*/}
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
            <p  className="resend">Resend Link</p>
            </Link>
            {isExpired ? (
        <p className="timer">Link expired!</p>
      ) : (
        
        <span className="timer">{formatTime(timeLeft)}</span> 
      )}

        </div>
        <button type="submit">Reset Password</button>
        <p style={{color:"red"}}>{message}</p>
      </form>
      
    </div>
   </div>
  );
};

export default ResetPassword;