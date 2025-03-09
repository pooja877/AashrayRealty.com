import {  useState } from "react";
import {Link} from "react-router-dom";
import './navbar.scss';
import {useSelector} from 'react-redux';
function Navbar()
{   
  const { currentUser } = useSelector((state) => state.user);
    const [open, setOpen] = useState(false);
    return(
        <>
       <nav>
        {/* left side */}
       <div className="left">
            <a href="/" className='logo'>
                <img src="/logo.jpeg" alt="" />
                <p>Aashray
                <span id="realty">Realty</span> 
                </p> 
            </a>
            <a href="/">Home</a> 
            <a href="/about">About us</a>
            <a href="/">Contact us</a>
            <a href="/properties">Properties</a>
       </div>

       {/* right side */}
        <div className="right">
          <Link to="/profile">      
              {currentUser? (<img src={currentUser.avatar} className="profile" />):(<p  className='register'>Sign in</p>)}
          </Link>

        {/* max-width is small */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>  
         
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/">Contact</a>
          <a href="/properties">Properties</a>
          {/* <a href="/signin">Sign in</a> */}
          {currentUser? (<a href="/profile">Profile</a>):(<a href="/signin">Sign in</a>)}
        </div>
        </div>
       </nav>
        </>
    );
}
export default Navbar;