import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Locationform = ({ area, city }) => {
  const [position, setPosition] = useState({
    lat: 23.0225, // Default Ahmedabad
    lng: 72.5714,
    address:"Gujarat",
  });

//   useEffect(() => {
//     const fetchCoordinates = async () => {
//       if (!area || !city) return;

//       const fullAddress = `${streetName}, ${area}, ${city}, Gujarat, India`.trim().replace(/\s+/g, " ");
//       const encodedAddress = encodeURIComponent(fullAddress);
//       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         if (data.length > 0) {
//           setPosition({
//             lat: parseFloat(data[0].lat),
//             lng: parseFloat(data[0].lon),
//             address: fullAddress,
//           });
//         }
//       } catch (error) {
//         console.error("Error fetching location:", error);
//       }
//     };

//     fetchCoordinates();
//   }, [streetName, area, city]);
useEffect(() => {
    const fetchCoordinates = async () => {
      if (!area || !city) return;
  
      const fullAddress = `${area}, ${city}, Gujarat, India`.trim().replace(/\s+/g, " ");
      const encodedAddress = encodeURIComponent(fullAddress);
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json(); // Debugging
  
        if (data.length > 0) {
          setPosition({
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
            address: data.name || fullAddress,
          });
        } else {
          console.warn("No results found for:", fullAddress);
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };
  
    fetchCoordinates();
  }, [area, city]);
  

  const ChangeView = ({ coords }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(coords, 13);
    }, [coords]);
    return null;
  };

  return (
    <MapContainer center={[position.lat, position.lng]} zoom={13} style={{ height: "300px", width: "100%" }}>
      <ChangeView coords={[position.lat, position.lng]} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[position.lat, position.lng]}>
        <Popup>{position.address || "Enter location"}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Locationform;
