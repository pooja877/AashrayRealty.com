import Map from "../../map/Map"
import AdminNavbar from "../adminNavbar/AdminNavbar"
import { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom'
import './Project.css'
export default function Project() {
  const [properties, setProperties] = useState([]);
  
    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("/api/property/all");
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
  
        fetchProperties();
    }, []);
  return (
     <>
     <AdminNavbar/>
      <div className="main-container">
        <div className="data" >
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div  className='container' key={property._id}>
                            <h3>{property.propertyName}</h3>
                            <img className='imgProperty'src={property.images[0]} alt="" />
                            <p>{property.desc}</p>
                            <p>Price: ${property.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
          
        <div className="map"><Map/></div>
      </div>
      </>
  )
}
