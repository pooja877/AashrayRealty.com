import './Map.css';
import { useEffect, useState } from "react";
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
export default function Map() {
   const position = [23.022505, 72.5713621];
   const navigate=useNavigate();
   const [properties, setProperties] = useState([]);
   useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await fetch("/api/property/getallmap");
            
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };
    fetchProperties();
}, []);


  

  return (
  <MapContainer center={position} zoom={10} className='mapview'>
  <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {properties.map((property) =>
      property.latitude && property.longitude ? (
          <Marker key={property._id} position={[property.latitude, property.longitude]}>
          
              <Popup>
                  <div className="popcontainer" onClick={() => navigate(`/Properties/${property._id}`)}>
                  {property.images?.length > 0 && (
                            <img
                            className="imagepopup"
                              src={property.images[0].url}
                              alt="Property"
                            />
                          )}
                    <div className="infocontain">
                    <h4>{property.propertyName}</h4>
                    <span>{property.address} {property.area} {property.city}</span>
                    <span>Type:{property.propertyType}</span>
                       
                    <p className="Price">₹{property.discountPrice ? (
                        <>
                          <span className="strike">{property.price}</span> 
                          <span className="discountrice">{property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}</span>
                        </>
                      ) : (
                        <span className="originalrice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
                      )}
                      </p>
                        
                    </div>
                    
                  </div>
              </Popup>
          </Marker>
      ) : null
  )}
</MapContainer>
  
  )
}
