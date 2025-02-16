import './Map.css';
import { useEffect, useState } from "react";
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
export default function Map() {
   const position = [23.022505, 72.5713621];
   const [properties, setProperties] = useState([]);
   useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await fetch("/api/property/getall");
            
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error("Error fetching properties:", error);
        }
    };
    fetchProperties();
}, []);


  

  return (
  //   <MapContainer center={position} zoom={7} scrollWheelZoom={false} className='mapview'>
  //   <TileLayer
  //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  //   />
  //   <Marker position={position}>
  //     <Popup>
  //       A pretty CSS3 popup. <br /> Easily customizable.
  //     </Popup>
  //   </Marker>
  // </MapContainer>
  <MapContainer center={position} zoom={7} className='mapview'>
  <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  />
  {properties.map((property) =>
      property.latitude && property.longitude ? (
          <Marker key={property._id} position={[property.latitude, property.longitude]}>
          
              <Popup>
                  <strong>{property.buildingName}</strong>
                  <br />
                  {property.street}, {property.area}, {property.city}
              </Popup>
          </Marker>
      ) : null
  )}
</MapContainer>
  
  )
}
