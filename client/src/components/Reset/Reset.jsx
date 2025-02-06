
import './Reset.scss'
// import { useNavigate } from 'react-router-dom';

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {useEffect} from "react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message,setmessage]=useState('');
  const navigate=useNavigate();


  useEffect(()=>{
    console.log(token);
  },[token]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
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
        setmessage("Password reset successful !!");
       navigate('/signin');
      } else {
        alert("not updated Password there is a some problem!!",data.message);
      }
    } catch (error) {
      
      alert("Something went wrong. Please try again.",error);
    }
  };

  return (
    <div className='reset'>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
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
        />
        <button type="submit">Reset Password</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ResetPassword;