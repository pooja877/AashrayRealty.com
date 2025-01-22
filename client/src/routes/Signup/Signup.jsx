import "./signup.scss"
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';


function SignUp()
{   const [formData,setFormData]=useState({
    email:"",
    password:"",
    confirm:""
});
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    const navigate=useNavigate();
    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        if(formData.password !== formData.confirm)
            {
                setError("Password do not match");
                return;
            } 
      
        try{
           
            setLoading(true);
        const res=await fetch('/api/auth/signup',
            {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify(formData),
        });
       
        const data=await res.json();
        if(data.success===false){
           
            setLoading(false);
            setError(data.message);
            return;
        }
        setLoading(false);
        setError(null);
        navigate('/signin');
        }
        catch(error)
        {
            setLoading(false);
            setError(error.message);
        }
      
        
    }
    return(
       <div className="signUp">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" id='username' onChange={handleChange}/>
            <input type="email" placeholder="Email" id='email'onChange={handleChange}/>
            <input type="password" placeholder="Password" id='password'onChange={handleChange}/>
            <input type="password" placeholder="Confirm Password" id='confirm'onChange={handleChange}/>
            <button disabled={loading} className="signup_btn">
                {loading?'Loading...':'Sign Up'}
            </button>
        </form>
        <div className="msg">
            <p>Already have an account?</p>
            <Link to={"/signin"}>
            <span>Sign in</span>
            </Link>
        </div>
        {error && <p className="errormsg">{error}</p>}
       </div>
    )
}
export default SignUp;