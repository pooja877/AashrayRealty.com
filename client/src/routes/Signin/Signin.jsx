import "./Signin.scss"
import {Link} from 'react-router-dom';
function Signin()
{
    return(
       <div className="signIn">
        <h1>Sign in</h1>
        <form >
            <input type="text" placeholder="Email" id='email'/>
            <input type="password" placeholder="Password" id='password'/>
            <button>SIGN In</button>
        </form>
        <div className="msg">
            <p> Do not Have an account?</p>
            <Link to={"/signup"}>
            <span>Sign Up</span>
            </Link>
        </div>
       </div>
    )
}
export default Signin;