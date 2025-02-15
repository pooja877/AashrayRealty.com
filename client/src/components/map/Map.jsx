import './Map.css';
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
//import { useEffect, useState } from 'react';
export default function Map() {
    const position = [23.022505, 72.5713621]
    // const [properties, setProperties] = useState([]);
    // const [center, setCenter] = useState([23.022505, 72.5713621]); // Default to India
  

  return (
    <MapContainer center={position} zoom={7} scrollWheelZoom={false} className='mapview'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>


//   <MapContainer center={center} zoom={7} className='mapview' >
//   <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  
//   {properties.map((property) => (
//     <Marker key={property._id} position={[property.latitude, property.longitude]}>
//       <Popup>
//         <b>{property.propertyName}</b>
//         <br />
//         {property.city}
//       </Popup>
//     </Marker>
//   ))}
// </MapContainer>
  )
}
