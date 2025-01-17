import "./signin.scss"
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';


function SignIn()
{   const [formData,setFormData]=useState({});
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            setLoading(true);

        const res=await fetch('/api/auth/signin',
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
        navigate('/');
        }
        catch(error)
        {
            setLoading(false);
            setError(error.message);
        }
        
    }
    return(
       <div className="signIn">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" id='email'onChange={handleChange}/>
            <input type="password" placeholder="Password" id='password'onChange={handleChange}/>
            <button disabled={loading}>
                {loading?'Loading...':'Sign In'}
            </button>
        </form>
        <div className="msg">
            <p>Already have an account?</p>
            <Link to={"/signup"}>
            <span>Sign Up</span>
            </Link>
        </div>
        {error && <p className="errormsg">{error}</p>}
       </div>
    )
}
export default SignIn;