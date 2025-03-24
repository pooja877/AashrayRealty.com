import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./LikedProperties.css";

export default function LikedProperties() {
    const [likedProperties, setLikedProperties] = useState([]);
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/user/me", {
                    method: "GET",
                    credentials: "include",
                });
                const data = await res.json();
                if (res.ok) {
                    setUser(data);
                    fetchLikedProperties(data._id);
                }
            } catch (error) {
                console.error("Not logged in", error);
            }
        };
        fetchUser();
    }, []);

    const fetchLikedProperties = async (userId) => {
        try {
            const res = await fetch(`/api/likes/${userId}`);
            const data = await res.json();
            if (res.ok) {
                setLikedProperties(data);
            }
        } catch (error) {
            console.error("Error fetching liked properties:", error);
        }
    };

    return (
        <div className="likeddis-container">
            <h2>Liked Properties</h2>
            {likedProperties.length > 0 ? (
                likedProperties.map(({ property }) => (
                    <div className="likeddis-property-card" key={property._id} onClick={() => navigate(`/Properties/${property._id}`)}>
                        <img src={property.images[0].url} alt="Property" className="likeddis-image" />
                        <div className="likeddis-info">
                            <h3>{property.propertyName}</h3>
                            <p><FaMapMarkerAlt /> {property.address}, {property.city}</p>
                            <p>₹{property.price} {property.transactionType === "Rent" ? "/month" : ""}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No liked properties.</p>
            )}
        </div>
    );
}
