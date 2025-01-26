import { Outlet ,Navigate} from 'react-router-dom';
export function Privateadmin() {
    const token = localStorage.getItem('adminToken');
    return token ? <Outlet/>: <Navigate to="/admin/login" />;
  }