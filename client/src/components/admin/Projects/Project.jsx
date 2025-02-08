  import Map from "../../map/Map"
import AdminNavbar from "../adminNavbar/AdminNavbar"
// import { Link } from 'react-router-dom'
import './Project.css'
export default function Project() {
  return (
     <>
     <AdminNavbar/>
      <div className="main-container">
        <div className="data">left</div>
        <div className="map"><Map/></div>
      </div>
      </>
  )
}
