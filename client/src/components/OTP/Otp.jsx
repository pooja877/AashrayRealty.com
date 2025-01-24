import './Otp.scss'
import  { useEffect,useState } from "react";
// import {Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
export default function Otp() {


    // const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [formData,setFormData]=useState({});
    const [otp] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleChange=(e)=>{
      setFormData({
          ...formData,
          [e.target.id]: e.target.value
      });
  }
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      setEmail(params.get('email') || '');
  }, []);
    
    // const handleInputChange = (e, index) => {
    //   const value = e.target.value;
  
    //    setOtp(value);
    //   if (value.length === 1 && index < inputRefs.length - 1) {
    //     inputRefs[index + 1].current.focus();
    //   }
  
    //   if (value === "" && index > 0) {
    //     inputRefs[index - 1].current.focus();
    //   }
    // };
  
    // const handleKeyDown = (e, index) => {
    //   if (e.key === "Backspace" && !e.target.value && index > 0) {
    //     inputRefs[index - 1].current.focus();
    //   }
    // }

    const handleVerifyOtp = async () => {
      try {
        console.log(formData);
        console.log(otp);
          const response = await fetch('/api/auth/verifyOtp', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({email,otp}),
          });
         
           console.log(response);
          const data = await response.text();
          if (response.ok) {
              navigate(`/resetPassword?email=${encodeURIComponent(email)}`);
          } else {
              setMessage(data);
          }
      } catch (error) {
          setMessage('OTP verification failed.',error);
      }
  };

 
  
  
  return (
    <div className='otps'>
     <div className="container">
     <h1>Email Verification</h1>
      <p className='info'>We have sent a code to your email</p>
      <div className="otp-inputs">
     <input type="text"  maxLength={4} onChange={handleChange}/>
     
      </div>
      <button onClick={handleVerifyOtp} >Verify Account</button>
      
      <p className='reset'>Did not recieve code? <span>Resend OTP</span></p>
      <p>{message}</p>
     </div>
    </div>
  )
}

