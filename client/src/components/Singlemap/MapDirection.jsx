import "./Mapdirection.css"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MapDirection( ) {
    const { id } = useParams(); // Get property ID from URL
    const [property, setProperty] = useState(null);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`/api/property/getmapSingle/${id}`);
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error("Error fetching property:", error);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) return <p>Loading...</p>;
  
    return (
      <MapContainer
        center={[property.latitude, property.longitude]}
        zoom={11}
        className="mapSingleview"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[property.latitude, property.longitude]}>
          <Popup>
            <div className="popcontainer">
              {property.images?.length > 0 && (
                <img className="imagepopup" src={property.images[0].url} alt="Property" />
              )}
              <div className="infocontain">
                <h4>{property.propertyName}</h4>
                <span>{property.address}, {property.area}, {property.city}</span>
                <span>Type: {property.propertyType}</span>
                <p className="ind-price">₹{property.discountPrice}</p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    );
  }
