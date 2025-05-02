import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Forgot.scss'
const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate=useNavigate();
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/forgetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      // console.log(data);
      const data = await response.json();
      if (response.success===true) {
        alert("Password reset link sent to your email.");
      } else {
        alert(data.message);
      }
      navigate("/signin");
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="mainforget" style={{borderRadius:"1rem"}}>
      <div className="forgot">  
     
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          required
        />
        <button className="btnsub" type="submit">Send Reset Link</button>
        
      </form>
    </div>
    </div>
  );
};

export default ForgotPassword;