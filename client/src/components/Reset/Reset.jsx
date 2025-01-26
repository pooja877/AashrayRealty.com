
import './Reset.scss'
// import { useNavigate } from 'react-router-dom';
// import {  useState ,useRef} from 'react';
// export default function Reset() {
//    const passwordRef = useRef(null);
//    const confirmPasswordRef = useRef(null);
//     const [formData, setFormData] = useState({});
//     const navigate=useNavigate();

   
   
//     const handleChange=(e)=>{
//       setFormData({
//           ...formData,
//           [e.target.id]: e.target.value
//       });
//   }

//     const validatePasswords = () => {
//       if (passwordRef.current.value !== confirmPasswordRef.current.value) {
//         alert('Passwords do not match');
//         return false;
//       }
//       return true;
//     };
   

//     const handleResetPassword=async (e)=>{
//       e.preventDefault();
//       if (!validatePasswords()) return;

//       const urlParams =new URLSearchParams(window.location.search);
//       const token=urlParams.get('token');
  
//       try {
//         const response = await fetch('/api/auth/reset', {
//           method: 'POST',
//           body: JSON.stringify({
//             token,
//             password:passwordRef.current.value
//           }),
//         });
        
//         const result = await response.json();
//         if(result.ok){
//           alert('Password reset successful!!',result.message);
//           navigate('/signin'); // Navigate to sign-in page
//         }
//         else{
//           alert('not reset!!');
//         }

//       } catch (error) {
        
//         alert('Something went wrong. Please try again.',error);
//       }
// }
 
//   return (
//     <div className='reset'>
//     <div className="container">
//     <h2>Change Password</h2>
//     <form action="" onSubmit={handleResetPassword} >
      
//       Password:<input type="password" id="password" placeholder='Enter new Password' ref={passwordRef}
//                 required onChange={handleChange}/>
     
//      Confirm Password: <input type="password"  id="confirmPassword" ref={confirmPasswordRef} placeholder='Confirm new Password' onChange={handleChange} required />
//       <button type="submit"> 
//             Save Changes
//            </button>
//      </form>
//     </div>
//    </div>
//   )
// }

import { useState } from "react";
import { useParams } from "react-router-dom";
import {useEffect} from "react";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Password reset successful!");
      } else {
        alert("not updated",data.message);
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
      
    </div>
  );
};

export default ResetPassword;