import "./signin.scss"
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signInStart,signInSuccess,signInFailure} from '../redux/user/userSlice.js';

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