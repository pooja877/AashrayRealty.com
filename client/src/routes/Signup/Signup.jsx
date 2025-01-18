import "./signup.scss"
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import OAuth from "../../components/google/OAuth";
import {useDispatch, useSelector} from 'react-redux';
import { signInStart ,signInFailure,signInSuccess} from "../../redux/user/userSlice";


function SignUp()
{   const [formData,setFormData]=useState({});
    const {loading,error} =useSelector((state)=>state.user);
    const dispatch=useDispatch();
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
            dispatch(signInStart());
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
           
            dispatch(signInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/signin');
        }
        catch(error)
        {
            dispatch(signInFailure(error.message));
        }
        
    }
    return(
       <div className="signUp">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" id='username'onChange={handleChange}/>
            <input type="text" placeholder="Email" id='email'onChange={handleChange}/>
            <input type="password" placeholder="Password" id='password'onChange={handleChange}/>
            <button disabled={loading} className="signup_btn">
                {loading?'Loading...':'Sign Up'}
            </button>
            <OAuth/>
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