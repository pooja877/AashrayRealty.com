import './Map.css';
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
export default function Map() {
   // const position = [23.022505, 72.5713621]
    const [properties, setProperties] = useState([]);
    const [center, setCenter] = useState([23.022505, 72.5713621]); // Default to India
  
    
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await fetch("/api/property/all");
          const data = await response.json();
          setProperties(data);
  
          // If properties exist, set center to the first one
          if (data.length > 0) {
            setCenter([parseFloat(data[0].latitude), parseFloat(data[0].longitude)]);
          }
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


  <MapContainer center={center} zoom={7} className='mapview' >
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
  {properties.map((property, index) => (
        <Marker
          key={index}
          position={[parseFloat(property.latitude), parseFloat(property.longitude)]}
        >
          <Popup>
            <b>{property.title}</b><br />
            {property.houseno}, {property.buildingName}, {property.streetName}, {property.area}, {property.city}
          </Popup>
    </Marker>
  ))}
</MapContainer>
  )
}
