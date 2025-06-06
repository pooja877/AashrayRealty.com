// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./UserListing.css";

// export default function UserListing() {
//     const [userProperties, setUserProperties] = useState([]);
//    const navigate = useNavigate();
//    const [user, setUser] = useState(null);
//    useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await fetch("/api/user/me", {
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         }
//       } catch (error) {
//         console.error("Not logged in", error);
//       }
//     };
//     fetchUser();
//   }, []);
//     useEffect(() => {
//         const fetchUserProperties = async () => {
//             try {
//                 const res = await fetch(`/api/userproperties/getuser/${user?.id}`);
//                 const data = await res.json();

//                 if (res.ok) {
//                     setUserProperties(data.properties);
//                 } else {
//                     console.error("Error fetching properties:", data.message);
//                 }
//             } catch (error) {
//                 console.error("Error fetching properties:", error);
//             }
//         };

//         if (user?.id) {
//             fetchUserProperties();
//         }
//     }, [user?.id]);

//     const handleDelete = async (propertyId) => {
//         const confirmDelete = window.confirm("Are you sure you want to delete this property?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetch(`/api/userproperties/delete/${propertyId}`, {
//                 method: "DELETE",
//                 credentials: "include",
//             });
//             const data = await res.json();
//             if (res.ok) {
//                 setUserProperties(userProperties.filter((property) => property._id !== propertyId));
//             } else {
//                 console.error("Error deleting property:", data.message);
//             }
//         } catch (error) {
//             console.error("Error deleting property:", error);
//         }
//     };

//     return (
//         <div className="userlist-container">
//             <h2 className="userlist-title">My Properties</h2>
//             {userProperties.length > 0 ? (
//                 <div className="userlist-column">
//                     {userProperties.map((property) => (
//                         <div key={property._id} className="userlist-card">
//                             <img src={property.images[0]} alt={property.title} className="userlist-image" onClick={() => navigate(`/userproperties/${property._id}`)}/>
//                             <div className="userlist-info">
//                                 <h3 className="userlist-title">{property.title}</h3>
//                                 <p className="userlist-description">{property.propertyType}</p>
//                                 <p>{property.bhk} - ₹{property.price}</p>
//                                 <p>{property.address} {property.area}, {property.city} {property.pincode}</p>
//                                 <div className="userlist-actions">
//                                     <Link to={`/updateProperty/${property._id}`} className="userlist-edit-btn">Edit</Link>
//                                     <button className="userlist-delete-btn" onClick={() => handleDelete(property._id)}>Delete</button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="userlist-no-properties">No properties listed yet.</p>
//             )}
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./UserListing.css";

export default function UserListing() {
    const [userProperties, setUserProperties] = useState([]);
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
                }
            } catch (error) {
                console.error("Not logged in", error);
            }
        };
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchUserProperties = async () => {
            try {
                const res = await fetch(`/api/userproperties/getuser/${user?.id}`);
                const data = await res.json();

                if (res.ok) {
                    setUserProperties(data.properties);
                } else {
                    console.error("Error fetching properties:", data.message);
                }
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        if (user?.id) {
            fetchUserProperties();
        }
    }, [user?.id]);

    const handleDelete = async (propertyId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this property?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/userproperties/delete/${propertyId}`, {
                method: "DELETE",
                credentials: "include",
            });
            const data = await res.json();
            if (res.ok) {
                setUserProperties(userProperties.filter((property) => property._id !== propertyId));
            } else {
                console.error("Error deleting property:", data.message);
            }
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    return (
        <div className="userlist-container">
            <h2 className="userlist-title">My Properties</h2>
            {userProperties.length > 0 ? (
                <div className="userlist-column">
                    {userProperties.map((property) => (
                        <div key={property._id} className="userlist-card">
                            <div className="userlist-image-wrapper">
                                <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="userlist-image"
                                    onClick={() => navigate(`/userproperties/${property._id}`)}
                                />
                                {property.status === "Approved" && (
                                    <span className="tick-mark">✔</span>
                                )}
                            </div>
                            <div className="userlist-info">
                                <h3 className="userlist-title">
                                    {property.title}
                                    {property.status === "Approved" && (
                                        <span title="Approved" style={{ color: "green", marginLeft: "8px" }}>
                                            ✅
                                        </span>
                                    )}
                                </h3>
                                <p className="userlist-description">{property.propertyType}</p>
                                <p>{property.bhk} - ₹{property.price}</p>
                                <p>{property.address} {property.area}, {property.city} {property.pincode}</p>
                                <div className="userlist-actions">
                                    <Link to={`/updateProperty/${property._id}`} className="userlist-edit-btn">Edit</Link>
                                    <button className="userlist-delete-btn" onClick={() => handleDelete(property._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="userlist-no-properties">No properties listed yet.</p>
            )}
        </div>
    );
}
