import "./signin.scss"
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInStart ,signInFailure,signInSuccess} from "../../redux/user/userSlice";
import OAuth from "../../components/google/OAuth";

function SignIn()
{   
    const [formData,setFormData]=useState({});
    const {loading,error} =useSelector((state)=>state.user);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }

    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            dispatch(signInStart());
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
           dispatch(signInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
        }
        catch(error)
        {
            dispatch(signInFailure(error.message));
        }
        
    }
    return(
       <div className="signIn">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" id='email'onChange={handleChange}/>
            <input type="password" placeholder="Password" id='password'onChange={handleChange}/>
            
            <Link to="/Otp"><p className="forget">Forget password?</p></Link>
            <button disabled={loading} className="signin_btn">
                {loading?'Loading...':'Sign In'}
            </button>   
            <p className="or">OR</p>
            <OAuth />
        </form>
        <div className="msg">
            <p>Do not have an Account?</p>
            <Link to={"/signup"}>
            <span>Sign Up</span>
            </Link>
        </div>
        {error && <p className="errormsg">{error}</p>}
       </div>
    )
}
export default SignIn;