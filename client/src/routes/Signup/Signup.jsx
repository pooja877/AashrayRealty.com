import "./signup.scss"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
//   const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(formData.password!=formData.confirm)
    {
      alert("Password and Confirm password should be same!!");
    }
    try {
        setLoading(true);
        setError(null);
        
        const res = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.message || "Signup failed!");
        }

        setLoading(false);
        alert("Verification email sent! Please check your inbox.");
        navigate("/");
        setFormData({ email: "", password: "", confirm: "" });

    } catch (error) {
        setLoading(false);
        setError(error.message);
    }
};

  return (
   <div className="mainsignup">
    <div className="signUp">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" id="username" onChange={handleChange} />
        <input type="email" placeholder="Email" id="email" onChange={handleChange} />
        {/* <input type="password" placeholder="Password" id="password" onChange={handleChange} /> */}
        {/* <input type="password" placeholder="Confirm Password" id="confirm" onChange={handleChange} /> */}
        <div className="password-container">
                           <input
                               type={showPassword ? "text" : "password"}
                               placeholder="Password"
                               id="password"
                               onChange={handleChange}
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
                               placeholder="Confirm Password"
                               id="confirm"
                               onChange={handleChange}
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

        <button disabled={loading} className="signup_btn">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      {/* {message && <p className="successmsg">{message}</p>} */}
      {error && <p className="errormsg">{error}</p>}
      <div className="msg">
        <p>Already have an account?</p>
        <Link to={"/signin"}>
          <span>Sign in</span>
        </Link>
      </div>
    </div></div>
  );
}

export default SignUp;
