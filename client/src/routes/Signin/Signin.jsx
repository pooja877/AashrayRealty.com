import "./signin.scss"
import { useState  } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { signInStart ,signInFailure,signInSuccess} from "../../redux/user/userSlice";
import OAuth from "../../components/google/OAuth";
// import ForgotPassword from '../../components/forgotPassword/ForgotPassword'


function SignIn()
{   
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData]=useState({});
    const {loading} =useSelector((state)=>state.user);
    const dispatch=useDispatch();
    // const [isOpen, setIsOpen] = useState(false);
    //const [message, setmessage] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate();

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
            setError(data.message);
           dispatch(signInFailure(data.message));
            return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
        }
        catch(err)
        {
            alert(err);
            setError(err);
            dispatch(signInFailure(err.message));
        }
        
    }
   

    return(
     <div className="mainsignin">
          <div className="signIn">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" id='email' onChange={handleChange}
                required />
            {/* <input type="password" placeholder="Password" id='password'onChange={handleChange}/> */}
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
            <Link to="/forgotPassword">
            <p  className="forget" >Forget password?</p>
            </Link>    
          
               {/* {isOpen && (
                   <div className="modal-overlay">
                    <ForgotPassword  onClose={() => setIsOpen(false)}/>
                   </div>
                 )} */}
            <button disabled={loading} className="signin_btn">
                {loading ?'Loading...':'Sign In'}
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
     </div>
    )
}

    
export default SignIn;