import { useNavigate } from 'react-router-dom';
import './TableProperty.css';
import { useState, useEffect } from "react";
import AdminNavbar from '../admin/adminNavbar/AdminNavbar';
const TableProperty = () => {
    const navigate=useNavigate();
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await fetch("/api/property/all");
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    fetchProperties();
}, []);
  // Fetch data from backend


const handleDelete=async(id)=>{
  const confirmDelete = window.confirm("Are you sure you want to delete this message?");
  if (!confirmDelete) return;
    try {
      const response = await fetch(`/api/property/deleteProperty/${id}`, {
          method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
          alert("Property deleted successfully");
          setProperties(properties.filter(property => property._id !== id));
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error("Error deleting property:", error);
  }
  }

 
const filteredProperties = properties.filter((prop) => {
  const numSearch = Number(search); // Convert search query to a number
  return [
      prop.propertyName,
      prop.city,
      prop.propertyType,
      prop.transactionType,
      prop.area,
  ].some(field => field?.toString().toLowerCase().includes(search.toLowerCase()))
  || (!isNaN(numSearch) && (prop.price === numSearch || prop.discountPrice === numSearch)); // Exact number match
});

  

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
     <AdminNavbar/>
   <div className="mainallproadmincontrol">
   <div className="divaddnewscontain">
   <div id='addProperty'onClick={()=>{navigate('/admin/addProperty')}}>Add Property</div>
   </div>
   
     <div className="admin-table">
      <h2 className='headpro'>Property List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Name,city,type,area,price"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Table */}
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>Property Name</th>
            <th>Property Type</th>
            <th>Transaction Type</th>
            <th>Address</th>
            <th>Area</th>
            <th>City</th>
            <th>Price</th>
            <th>Discounted Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProperties.map((prop, index) => (
            <tr key={prop._id}>
              <td>{index + 1 + indexOfFirstRow}</td>
              <td>{prop.propertyName}</td>
              <td>{prop.propertyType}</td>
              <td>{prop.transactionType}</td>
              <td>{prop.address}</td>
              <td>{prop.area}</td>
              <td>{prop.city}</td>
              <td>₹{prop.price}</td>
              <td> {prop.discountPrice ? `₹${prop.discountPrice}`:"--"}</td>
              <td >
                <button onClick={()=>navigate(`/admin/property/updateProperty/${prop._id}`)} className="updateprobtn">
                  Update
                </button>
               
                <button onClick={() => handleDelete(prop._id)} className="deleteprobtn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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

export default TableProperty;
