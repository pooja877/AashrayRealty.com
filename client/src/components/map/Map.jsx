import './Map.css';
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
export default function Map() {
    //const position = [23.022505, 72.5713621]
    const [properties, setProperties] = useState([]);
    const [center, setCenter] = useState([20.5937, 78.9629]); // Default to India
  
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/properties/all");
          const data = await response.json();
          setProperties(data);
  
          // Calculate the center of all properties
          if (data.length > 0) {
            const avgLat = data.reduce((sum, p) => sum + parseFloat(p.latitude), 0) / data.length;
            const avgLng = data.reduce((sum, p) => sum + parseFloat(p.longitude), 0) / data.length;
            setCenter([avgLat, avgLng]);
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
  <MapContainer center={center} zoom={5} style={{ height: "500px", width: "100%" }}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
  {properties.map((property) => (
    <Marker key={property._id} position={[property.latitude, property.longitude]}>
      <Popup>
        <b>{property.name}</b>
        <br />
        {property.city}, {property.state}
      </Popup>
    </Marker>
  ))}
</MapContainer>
  )
}
