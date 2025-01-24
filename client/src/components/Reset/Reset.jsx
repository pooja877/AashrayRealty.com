
import './Reset.scss'
import { useNavigate } from 'react-router-dom';
import {  useState ,useRef} from 'react';
export default function Reset() {
   const passwordRef = useRef(null);
   const confirmPasswordRef = useRef(null);
    const [formData, setFormData] = useState({});
    const navigate=useNavigate();
   
    const handleChange=(e)=>{
      setFormData({
          ...formData,
          [e.target.id]: e.target.value
      });
  }

    const validatePasswords = () => {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        alert('Passwords do not match');
        return false;
      }
      return true;
    };
   

    const handleResetPassword=async (e)=>{
      e.preventDefault();
      if (!validatePasswords()) return;
  
      try {
        const response = await fetch('/api/auth/resetPassword', {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        
        

        const result = await response.json();
        if (response.ok) {
          alert('Password reset successful');
          navigate('/signin'); // Navigate to sign-in page
        } else {
          alert('error',result.message);
        }

      } catch (error) {
        
        alert('Something went wrong. Please try again.',error);
      }
}
 
  return (
    <div className='reset'>
    <div className="container">
    <h2>Change Password</h2>
    <form action="" onSubmit={handleResetPassword} >
      
      Password:<input type="text" id="password" placeholder='Enter new Password' ref={passwordRef}
                required onChange={handleChange}/>
     
     Confirm Password: <input type="text"  id="confirmPassword" ref={confirmPasswordRef} placeholder='Confirm new Password' onChange={handleChange} required />
      <button > 
            Save Changes
           </button>
     </form>
    </div>
   </div>
  )
}

