import './Map.css';
import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
export default function Map() {
    const position = [23.022505, 72.5713621]
  

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
  )
}
