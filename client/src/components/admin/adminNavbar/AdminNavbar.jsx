import { useNavigate } from 'react-router-dom';
import './AdminNavbar.css'
import { useState } from 'react';
export default function AdminNavbar() {
  const navigate = useNavigate();
   const [open, setOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };
  return (
    <>
   
  
    <nav className='head'>
        {/* left side */}
       <div className="adminleft">
            <a href="/admin/dashboard" className='logo'>
                <img src="/logo.jpeg" alt="" />
                <p>Aashray
                <span id="realty">Realty</span> 
                </p> 
            </a>
            
       </div>

       {/* right side */}
        <div className="adminright">
        <a href="/admin/dashboard">Dashboard</a> 
             <a href='/admin/dashboard'>users</a>
            <a href="/admin/properties">Properties</a>
            <a href="/admin/addProperty" className='addProperty'>+ Add Property</a>
            <button onClick={handleLogout} className='logoutadmin'>Logout</button>

        {/* max-width is small */}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>  
         
        <a href="/admin/dashboard">Dashboard</a> 
        <a href='/admin/dashboard'>users</a>
            <a href="/admin/properties">Properties</a>
            <a href="/admin/addProperty">Add Property</a>
            <button className='logoutadmin' onClick={handleLogout}>Logout</button>
        </div>
        </div>
       </nav>
   
    
    </>
  )
}
