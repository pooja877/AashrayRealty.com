import './Otp.scss'
import  {  useRef } from "react";
import {Link} from "react-router-dom";
export default function Otp() {


    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    
    const handleInputChange = (e, index) => {
      const value = e.target.value;
  
      if (value.length === 1 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
  
      if (value === "" && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  
  return (
    <div className='otp'>
     <div className="container">
     <h1>Email Verification</h1>
      <p className='info'>We have sent a code to your email</p>
      <div className="otp-inputs">
      {inputRefs.map((inputRef, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              ref={inputRef}
              onChange={(e)=>handleInputChange(e,index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              required 
            />
          ))}
      </div>
      <Link to="/reset">
      <button  >Verify Account</button>
      </Link>
      
      <p className='reset'>Did not recieve code? <span>Resend OTP</span></p>
     </div>
    </div>
  )
}

