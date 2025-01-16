import {  useState } from "react";
//import {Link} from "react-router-dom";
import './navbar.scss';
function Navbar()
{
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
            <a href="/About">About us</a>
            <a href="/">Contact us</a>
            <a href="/">News</a>
       </div>
       {/* right side */}
        <div className="right">
        <a href="/" className='register'>Sign Up</a>
        {/* max-width is small */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <a href="/Home">Home</a>
          <a href="/About">About</a>
          <a href="/">Contact</a>
          <a href="/">News</a>
          <a href="/">Sign up</a>
        </div>
        </div>
       </nav>
        </>
    );
}
export default Navbar;