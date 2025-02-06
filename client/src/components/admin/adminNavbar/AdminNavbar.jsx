import { useNavigate,Link } from 'react-router-dom';
import './AdminNavbar.css'
export default function AdminNavbar() {
  const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };
  return (
    <>
    {/* row items */}
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
        <Link to="/admin/property">
            <img src="/projects_1.png" alt="" />
            </Link>

       <span>Projects</span>
       </div>
       <div className="item">
        <Link to="/admin/property/add">
            <img src="/home_1.png" alt="" />
            </Link>

       <span>Property</span>
       </div>

       <button onClick={handleLogout}>Logout</button>
    </div>
    </div>
   
    
    </>
  )
}

