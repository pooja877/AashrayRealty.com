import Map from "../../map/Map"
import AdminNavbar from "../adminNavbar/AdminNavbar"
import { useState, useEffect } from 'react';
import './Project.css'
import { useNavigate } from "react-router-dom";
export default function Project() {
  const [properties, setProperties] = useState([]);
  const navigate=useNavigate();
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

    const handleDeleteProperty=async(id)=>{
      try {
        const response = await fetch(`/api/property/deleteProperty/${id}`, {
            method: "DELETE",
        });

        const data = await response.json();
        if (response.ok) {
            alert("Property deleted successfully");
            setProperties(properties.filter(property => property._id !== id));
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Error deleting property:", error);
    }
    }
   
  return (
     <>
     <AdminNavbar/>
      <div className="main-contain">
        <div className="data" >
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div  className='contain' key={property._id}>
                           {property.images?.length > 0 && (
                            <img
                            className="imageConatiner"
                              src={property.images[0].url}
                              alt="Property"
                            />
                          )}
                            
                          <div className="info"> 
                             <h3>{property.propertyName}</h3>
                            <div className="prodetails">
                              <img className='icon' src="/location_20.png" alt="" />
                              <p>{property.houseno} {property.buildingName} {property.streetName} {property.area} {property.city}</p></div>
                            
                            <div className="price">₹{property.discountPrice}</div>
                            <div className="bathbed">
                            <div className="bed">
                              <img className="iconBed" src="/bed_8.png" alt="bed" />
                              <span>{property.bedrooms} bedrooms</span>
                            </div>
                            <div className="bath">
                              <img className="iconBath" src="/bathroom_2.png" alt="bath" />
                              <span>{property.bathrooms} bathrooms</span>
                            </div>
                            </div>
                            <div className="btns">
                             <button onClick={()=>navigate(`/admin/projects/updateProperty/${property._id}`)} className="btnUpdate ">Update</button>
                             <button onClick={() => handleDeleteProperty(property._id)}className="btnDelete">Delete</button>
                            </div>
                            </div>
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
