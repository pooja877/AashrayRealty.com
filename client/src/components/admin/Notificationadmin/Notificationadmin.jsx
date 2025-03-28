import { Link } from 'react-router-dom'
import AdminNavbar from '../adminNavbar/AdminNavbar'
import './Notificationadmin.css'

export default function Notificationadmin() {
  return (
   <>
   <AdminNavbar/>
   <div className="mainmessagecontainerr">
   <div className="admin-messages">
                    {/* Title with Delete All Button */}
    <div className="messages-header">
        <h2>All Notification</h2>
    </div>
  <Link to="/admin/contact">
  <div className="contactusmessage">Contact Messages</div></Link>
     </div>
    </div>
   </>
  )
}
