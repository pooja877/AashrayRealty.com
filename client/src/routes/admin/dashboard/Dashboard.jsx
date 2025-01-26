// client/src/pages/AdminDashboard.jsx
import './Dashboard.scss'
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
    };

    return (
        <div>
            <h2>Admin Dashboard</h2>
            <p>Welcome, Admin!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminDashboard;
