import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./LikedProperties.css";

export default function BookedProperties() {
    const [rentedProperties, setrentedProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookedProperties = async () => {
            try {
                const res = await fetch("/api/rent/rented", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch rented properties");

                const data = await res.json();
                if (Array.isArray(data)) {
                    setrentedProperties(data.filter(item => item.propertyId)); 
                } else {
                    setrentedProperties([]);
                }
            } catch (error) {
                console.error("Error fetching rented properties:", error);
                setrentedProperties([]);
            }
        };

        fetchBookedProperties();
    }, []);


    return (
       <div className="mainlikedd">
         <div className="likeddis-main-user-contain">
            <h2>Rented Properties</h2>
            <div className="likeddis-datapro">
                {rentedProperties.length > 0 ? (
                    rentedProperties.map(({ propertyId }) => (
                        <div className="likeddis-contain" key={propertyId._id}>
                            <div className="likeddis-imageWrapper">
                                {propertyId.images?.length > 0 && (
                                    <img
                                        className="likeddis-imageConatiner"
                                        src={propertyId.images[0].url}
                                        alt="Property"
                                        onClick={() => navigate(`/Properties/${propertyId._id}`)}
                                    />
                                )}
                            </div>

                            <div className="likeddis-info" onClick={() => navigate(`/Properties/${propertyId._id}`)}>
                                <h3>{propertyId.propertyName}</h3>
                                <div className="likeddis-prodetails">
                                    <FaMapMarkerAlt />
                                    <p>{propertyId.address} {propertyId.area} {propertyId.city}</p>
                                </div>
                                <p className='likeddis-protype'>For {propertyId.transactionType}</p>
                                <div className="likeddis-price">
                                    <p className="likeddis-ind-price">
                                        ₹{propertyId.discountPrice ? (
                                            <>
                                                <span className="likeddis-strike">{propertyId.price}</span> 
                                                <span className="likeddis-discountprice">{propertyId.discountPrice} {propertyId.transactionType === "Rent" ? "/month" : ""}</span>
                                            </>
                                        ) : (
                                            <span className="likeddis-originalprice">{propertyId.price} {propertyId.transactionType === "Rent" ? "/month" : ""}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No rented properties found.</p>
                )}
            </div>
        </div>
       </div>
    );
}
