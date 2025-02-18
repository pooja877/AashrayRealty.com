import Map from '../../components/map/Map';
import { useState, useEffect } from 'react';
import './Properties.css';
import { useNavigate } from 'react-router-dom';

export default function Properties() {
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
  return (
    <>
    <div className="main-user-contain">
    <div className="datapro" >
            {properties.length > 0 ? (
                properties.map((property) => (
                    <div  className='contain' key={property._id}>
                       {property.images?.length > 0 && (
                        <img
                        className="imageConatiner"
                          src={property.images[0].url}
                          alt="Property"
                          onClick={()=>navigate(`/Properties/Single_Property/${property._id}`)}
                        />
                      )}
                        
                      <div className="info"> 
                         <h3>{property.propertyName}</h3>
                        <div className="prodetails">
                          <img className='icon' src="/location_20.png" alt="" />
                          <p>{property.houseno} {property.buildingName} {property.streetName} {property.area} {property.city}</p></div>
                        
                        <div className="price">₹{property.discountPrice}</div>
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



 
