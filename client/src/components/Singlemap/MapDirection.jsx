// import "./Mapdirection.css"
// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function MapDirection( ) {
//     const { id } = useParams(); // Get property ID from URL
//     const [property, setProperty] = useState(null);

//     useEffect(() => {
//         const fetchProperty = async () => {
//             try {
//                 const response = await fetch(`/api/property/getmapSingle/${id}`);
//                 const data = await response.json();
//                 setProperty(data);
//             } catch (error) {
//                 console.error("Error fetching property:", error);
//             }
//         };
//         fetchProperty();
//     }, [id]);

//     if (!property) return <p>Loading...</p>;
  
//     return (
//       <MapContainer
//         center={[property.latitude, property.longitude]}
//         zoom={11}
//         className="mapSingleview"
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         <Marker position={[property.latitude, property.longitude]}>
//           <Popup>
//             <div className="popcontainer">
//               {property.images?.length > 0 && (
//                 <img className="imagepopup" src={property.images[0].url} alt="Property" />
//               )}
//               <div className="infocontain">
//                 <h4>{property.propertyName}</h4>
//                 <span>{property.address}, {property.area}, {property.city}</span>
//                 <span>Type: {property.propertyType}</span>
//                 <p className="ind-price">{property.discountPrice ? (
//                         <>
//                           <span className="strike">{property.price}</span> 
//                           <span className="discountprice">{property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}</span>
//                         </>
//                       ) : (
//                         <span className="originalprice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
//                       )}
//                       </p>
                      
//               </div>
//             </div>
//           </Popup>
//         </Marker>
//       </MapContainer>
//     );
//   }
import "./Mapdirection.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MapDirection() {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [isMapInteractive, setIsMapInteractive] = useState(false);

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
        <div style={{ position: "relative", width: "100%", height: "300px" }}>
            {/* Map Container */}
            <MapContainer
                center={[property.latitude, property.longitude]}
                zoom={11}
                style={{ height: "100%", width: "100%" }}
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
                                <p className="ind-price">
                                    {property.discountPrice ? (
                                        <>
                                            <span className="strike">{property.price}</span> 
                                            <span className="discountprice">{property.discountPrice} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                        </>
                                    ) : (
                                        <span className="originalprice">{property.price} {property.transactionType === "Rent" ? "/month" : ""}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            </MapContainer>

            {/* Disable Map Overlay */}
            {!isMapInteractive && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.5)", // Light overlay
                        zIndex: 1000,
                        cursor: "not-allowed",
                    }}
                ></div>
            )}

            {/* Enable Button */}
            {!isMapInteractive && (
                <button
                    onClick={() => setIsMapInteractive(true)}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        backgroundColor: "navy",
                        color: "white",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        zIndex: 1001
                    }}
                >
                    Enable Map Interaction
                </button>
            )}
        </div>
    );
}
