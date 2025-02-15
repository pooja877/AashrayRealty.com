import './Listing.css';
import { useEffect, useState } from "react";
export default function Listing() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProperties = async () => {
          try {
            const response = await fetch("/api/property/all");
            const data = await response.json();
            setProperties(data);
          } catch (error) {
            console.error("Error fetching properties:", error);
          }
        };
    
        fetchProperties();
      }, []);
  return (
    
        <div className="listings">
            {properties.map((property) => (
                <div className="listing" key={property._id}>
                    <img src={property.images[0]} alt={property.propertyName} />
                    <div className="details">
                        <h3>{property.propertyName}</h3>
                        <p>{property.area}</p>
                        <span className="price">${property.price}</span>
                        <p>{property.bedrooms} bedroom • {property.bathrooms} bathroom</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

