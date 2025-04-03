// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
// import "./LikedProperties.css";

// export default function LikedProperties() {
//     const [likedProperties, setLikedProperties] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchLikedProperties = async () => {
//             try {
//                 const res = await fetch("/api/likes/liked", {
//                     method: "GET",
//                     credentials: "include",
//                 });

//                 if (!res.ok) throw new Error("Failed to fetch liked properties");

//                 const data = await res.json();
//                 if (Array.isArray(data)) {
//                     setLikedProperties(data.filter(item => item.propertyId)); 
//                 } else {
//                     setLikedProperties([]);
//                 }
//             } catch (error) {
//                 console.error("Error fetching liked properties:", error);
//                 setLikedProperties([]);
//             }
//         };

//         fetchLikedProperties();
//     }, []);

//     const handleUnlike = async (propertyId) => {
//         try {
//             const res = await fetch("/api/likes/unlike", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 credentials: "include",
//                 body: JSON.stringify({ propertyId }),
//             });

//             if (!res.ok) throw new Error("Failed to unlike property");

//             setLikedProperties((prev) => prev.filter((p) => p.propertyId._id !== propertyId));
//         } catch (error) {
//             console.error("Error unliking property:", error);
//         }
//     };

//     return (
//        <div className="mainlikedd">
//          <div className="likeddis-main-user-contain">
//             <h2>Liked Properties</h2>
//             <div className="likeddis-datapro">
//                 {likedProperties.length > 0 ? (
//                     likedProperties.map(({ propertyId }) => (
//                         <div className="likeddis-contain" key={propertyId._id}>
//                             <div className="likeddis-imageWrapper">
//                                 {propertyId.images?.length > 0 && (
//                                     <img
//                                         className="likeddis-imageConatiner"
//                                         src={propertyId.images[0].url}
//                                         alt="Property"
//                                         onClick={() => navigate(`/Properties/${propertyId._id}`)}
//                                     />
//                                 )}
//                                 <FaHeart
//                                     className="likeddis-likeButton"
//                                     onClick={() => handleUnlike(propertyId._id)}
//                                 />
//                             </div>

//                             <div className="likeddis-info" onClick={() => navigate(`/Properties/${propertyId._id}`)}>
//                                 <h3>{propertyId.propertyName}</h3>
//                                 <div className="likeddis-prodetails">
//                                     <FaMapMarkerAlt />
//                                     <p>{propertyId.address} {propertyId.area} {propertyId.city}</p>
//                                 </div>
//                                 <p className='likeddis-protype'>For {propertyId.transactionType}</p>
//                                 <div className="likeddis-price">
//                                     <p className="likeddis-ind-price">
//                                         ₹{propertyId.discountPrice ? (
//                                             <>
//                                                 <span className="likeddis-strike">{propertyId.price}</span> 
//                                                 <span className="likeddis-discountprice">{propertyId.discountPrice} {propertyId.transactionType === "Rent" ? "/month" : ""}</span>
//                                             </>
//                                         ) : (
//                                             <span className="likeddis-originalprice">{propertyId.price} {propertyId.transactionType === "Rent" ? "/month" : ""}</span>
//                                         )}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No liked properties found.</p>
//                 )}
//             </div>
//         </div>
//        </div>
//     );
// }
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import "./LikedProperties.css";

export default function LikedProperties() {
    const [likedProperties, setLikedProperties] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLikedProperties = async () => {
            try {
                const res = await fetch("/api/likes/liked", {
                    method: "GET",
                    credentials: "include",
                });

                if (!res.ok) throw new Error("Failed to fetch liked properties");

                const data = await res.json();
                if (Array.isArray(data)) {
                    setLikedProperties(data.filter(item => item.propertyId));
                } else {
                    setLikedProperties([]);
                }
            } catch (error) {
                console.error("Error fetching liked properties:", error);
                setLikedProperties([]);
            }
        };

        fetchLikedProperties();
    }, []);

    const handleUnlike = async (propertyId, propertyType) => {
        try {
            const res = await fetch("/api/likes/unlike", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ propertyId, propertyType }), 
            });

            if (!res.ok) throw new Error("Failed to unlike property");

            setLikedProperties((prev) => prev.filter((p) => p.propertyId._id !== propertyId));
        } catch (error) {
            console.error("Error unliking property:", error);
        }
    };

    return (
        <div className="mainlikedd">
            <div className="likeddis-main-user-contain">
                <h2>Liked Properties</h2>
                <div className="likeddis-datapro">
                    {likedProperties.length > 0 ? (
                        likedProperties.map(({ propertyId, propertyType }) => (
                            <div className="likeddis-contain" key={propertyId._id}>
                                <div className="likeddis-imageWrapper">
                                    {propertyId.images?.length > 0 ? (
                                        <img
                                            className="likeddis-imageConatiner"
                                            src={propertyId.images[0].url || propertyId.images[0]}
                                            alt="Property"
                                            onClick={() =>
                                                navigate(
                                                    propertyType === "UserProperty"
                                                        ? `/UserProperties/${propertyId._id}`
                                                        : `/Properties/${propertyId._id}`
                                                )
                                            }
                                        />
                                    ) : (
                                        <img
                                            className="likeddis-imageConatiner"
                                            src="/default-image.jpg"
                                            alt="No Image"
                                            onClick={() =>
                                                navigate(
                                                    propertyType === "UserProperty"
                                                        ? `/UserProperties/${propertyId._id}`
                                                        : `/Properties/${propertyId._id}`
                                                )
                                            }
                                        />
                                    )}
                                    <FaHeart
                                        className="likeddis-likeButton"
                                        onClick={() => handleUnlike(propertyId._id, propertyType)}
                                    />
                                </div>

                                <div className="likeddis-info" 
                                    onClick={() =>
                                        navigate(
                                            propertyType === "UserProperty"
                                                ? `/UserProperties/${propertyId._id}`
                                                : `/Properties/${propertyId._id}`
                                        )
                                    }>
                                    <h3>{propertyId.propertyName || propertyId.title}</h3>
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
                        <p>No liked properties found.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
