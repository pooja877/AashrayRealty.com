import "./signup.scss"
import {Link} from 'react-router-dom';
function SignUp()
{
    return(
       <div className="signUp">
        <h1>Sign Up</h1>
        <form >
            <input type="text" placeholder="Username" id='username'/>
            <input type="text" placeholder="Email" id='email'/>
            <input type="password" placeholder="Password" id='password'/>
            <button>SIGN UP</button>
        </form>
        <div className="msg">
            <p>Alredy have an account?</p>
            <Link to={"/signin"}>
            <span>Sign in</span>
            </Link>
        </div>
       </div>
    )
}
export default SignUp;