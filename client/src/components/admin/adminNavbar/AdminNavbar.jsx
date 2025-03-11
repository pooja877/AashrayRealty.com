import { useNavigate ,Link} from 'react-router-dom';
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
   
   <div className="header">
      <a href="/admin/dashboard" className='logo'>
                <img src="/logo.jpeg" alt="" />
                <p>Aashray
                <span id="realty">Realty</span> 
                </p> 
            </a>
    <div className="right">
    <div className="item">
      <img src="/dashboard_21.png" alt="" />
      <span>Dashboard</span>
      </div>
       <div className="item">
        <Link to="/admin/properties">
            <img src="/projects_1.png" alt="" />
            </Link>

       <span>Property</span>
       </div>
       <div className="item">
        <Link to="/admin/addProperty">
            <img src="/home_1.png" alt="" />
            </Link>

       <span>Add Property</span>
       </div>

       <button onClick={handleLogout}>Logout</button>


         

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
            <a href="/admin/properties">Properties</a>
            <a href="/admin/addProperty">Add Property</a>
            <button onClick={handleLogout}>Logout</button>
        </div>
        </div>
    </div>
   
    
    </>
  )
}

