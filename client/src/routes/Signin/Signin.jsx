import "./signin.scss"
import { useState  } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { signInStart ,signInFailure,signInSuccess} from "../../redux/user/userSlice";
import OAuth from "../../components/google/OAuth";


function SignIn()
{   
    
    const [formData,setFormData]=useState({});
    const {loading} =useSelector((state)=>state.user);
    const dispatch=useDispatch();
    //const [message, setmessage] = useState('');
    const [error, seterror] = useState('');
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    }
   
       
    
        const handleLogin = async (e) => {
            e.preventDefault();
            if(!formData.email)
            {
                alert('please enter email');
                return;
            }
                try{
                    const res=await fetch('/api/auth/forgetPassword',
                        {
                        method:'POST',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body: JSON.stringify(formData),
                    
                  });
                  
                  const data = await res.json();
               
                  if(res.ok)
                  {
                    alert('Password reset link sent. Check your email !!');
                  }
    
                 else
                 {alert(data.error,"Failed to send reset link");} 
                }
                catch(err)
                {
                    seterror(err);
                }
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
        catch(err)
        {
            dispatch(signInFailure(err.message));
        }
        
    }
   

    return(
       <div className="signIn">
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" id='email' onChange={handleChange}
                required />
            <input type="password" placeholder="Password" id='password'onChange={handleChange}/>
            
       
            <p  onClick={handleLogin} className="forget">Forget password?</p>
          
            {/* <Link to="/Otp">
            <p  className="forget">Forget password?</p>
            </Link> */}
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
    )
}

    
export default SignIn;