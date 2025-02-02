//  import AdminNavbar from "../adminNavbar/AdminNavbar"
import { Link } from 'react-router-dom'
import './Property.css'
export default function AdminProperty() {
  return (
     
      <div className="funcProperty">
        <Link to="/admin/property/add">
        <button>Add Property</button>
        </Link>
        <button>Remove Property</button>
        <button>Update Property</button>
      </div>
  )
}
