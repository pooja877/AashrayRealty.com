import './NewsTable.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AdminNavbar from '../adminNavbar/AdminNavbar';

const PropertyTable = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch("/api/userproperties/getAll");
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties();
    }, []);

    // const handleActivation = async (id) => {
    //     try {
    //         const response = await fetch(`/api/userproperties/activate/${id}`, {
    //             method: "PUT",
    //             headers: { "Content-Type": "application/json" }
    //         });
    //         if (response.ok) {
    //             alert("Property status updated to Approved");
    //             setProperties(properties.map(prop => 
    //                 prop._id === id ? { ...prop, status: "Approved" } : prop
    //             ));
    //         }
    //     } catch (error) {
    //         console.error("Error updating status:", error);
    //     }
    // };

    const handleActivation = async (propertyId) => {
        try {
            const response = await fetch(`/api/userproperties/toggle-status/${propertyId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || "Failed to update status");
            }
    
            // console.log("✅ Updated Status from API:", data.status); // Debug log
    
            // ✅ Ensure UI updates immediately
            setProperties((prev) =>
                prev.map((prop) =>
                    prop._id === propertyId ? { ...prop, status: data.status } : prop
                )
            );
    
            alert(`Property status updated to ${data.status}`);
        } catch (error) {
            console.error("❌ Error updating property status:", error);
        }
    };
    
    
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            const response = await fetch(`/api/userproperties/delete/${id}`, { method: "DELETE" });
            if (response.ok) {
                alert("Property deleted successfully");
                setProperties(properties.filter(prop => prop._id !== id));
            }
        } catch (error) {
            console.error("Error deleting property:", error);
        }
    };

    const filteredProperties = properties.filter((prop) =>
        [prop.title, prop.city, prop.propertyType,prop._id,prop.userId,prop.area,prop.status].some(field => 
            field?.toLowerCase().includes(search.toLowerCase())
        )
    );

    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstRow, indexOfLastRow);

    return (
        <>
            <AdminNavbar />
            <div className="mainalluseradmincontrol">
            <div className="admin-table">
                <h2 className='headpro'>User Property List</h2>
                <input
                    type="text"
                    placeholder="Search by Title, City, or Type ,id and more..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="search-box"
                />
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>UserId</th>
                            <th>ProeprtyId</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>BHK</th>
                            <th>Image</th>
                            <th>Type</th>
                            <th>TransactionType</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProperties.map((prop, index) => (
                            <tr key={prop._id}>
                                <td>{index + 1 + indexOfFirstRow}</td>
                                <td>{prop.userId}</td>
                                <td>{prop._id}</td>
                                <td>{prop.title}</td>
                                <td>{prop.address} {prop.area}, {prop.city} </td>
                               <td>{prop.bhk}</td>
                                
                                <td>
                                    <img 
                                        src={prop.images[0]} 
                                        alt="property" 
                                        style={{ width: "3rem", height: "3rem", objectFit: "cover" }} 
                                    />
                                </td>
                                <td>{prop.propertyType}</td>
                                <td>{prop.transactionType}</td>
                                <td>
                                <button 
                                    onClick={() => handleActivation(prop._id)} 
                                    className="updateprobtn"
                                >
                                    {prop.status}
                                </button>



                                    <button onClick={() => navigate(`/userproperties/${prop._id}`)} className='updateprobtn'>Details</button>
                                    <button onClick={() => handleDelete(prop._id)} className='deleteprobtn'>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastRow >= filteredProperties.length}
                    >
                        Next
                    </button>
                </div>
            </div>
            </div>
        </>
    );
};

export default PropertyTable;
