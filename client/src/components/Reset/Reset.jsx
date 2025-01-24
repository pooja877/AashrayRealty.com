import './Reset.scss';
import { useState } from 'react';
import { useNavigate,useParams } from "react-router-dom";

export default function Reset() {
  const [ formData,setFormData] = useState('');
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {token} =useParams();
  const navigate=useNavigate();

  const handleChange=(e)=>{
    setFormData({
        ...formData,
        [e.target.id]: e.target.value
    });
  }


const handleResetPassword = async (e) => {
  e.preventDefault();
  try {
    formData.set('token',token);

    const response = await fetch("/api/auth/resetPassword", {
      method: "POST",
      headers:{
        'Content-Type':'application/json',
    },
    body:formData, 
  });

    const data = await response.json();
    if (!response.ok) {throw new Error(data.error || "Failed to reset password");}
    else {
          setMessage('Password reset successful. you can now sign in.');
          setTimeout(()=>navigate('/signin'),3000);
    }

  } catch (err) {
    setError('Something went wrong!!',err);
  }
};

  return (
    <div className='reset'>
    <div className="container">
    <h2>Change Password</h2>
    <form action="" onSubmit={handleResetPassword} >
      <label htmlFor='password'>New Password </label>
      <input type="password" id="password" placeholder='Enter new Password'
                required onChange={handleChange}/>
      <label htmlFor='confirmPassword' >Confirm Password </label>
      <input type="password" id="confirmPassword"placeholder='Confirm new Password' onChange={handleChange} required />
           <button >Reset Password</button>
         { message && <p>{message}</p>}
          {error && <p>{error}</p>}
     </form>
    </div>
   </div>
  )
}

