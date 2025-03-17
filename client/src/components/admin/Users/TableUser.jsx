 import './TableUser.css';
import AdminNavbar from '../adminNavbar/AdminNavbar';
import { useState, useEffect } from "react";
const TableUser = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await fetch("/api/user/all");
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    fetchUsers();
}, []);

const handleDelete=async(id)=>{
  try {
    const response = await fetch(`/api/user/deleteuser/${id}`, {
        method: "DELETE",
    });

    const data = await response.json();
    if (response.ok) {
        alert("Property deleted successfully");
        setUsers(users.filter(user => user._id !== id));
    } else {
        alert(data.message);
    }
} catch (error) {
    console.error("Error deleting property:", error);
}
}
 

  // Filter properties based on search input

const filteredUsers = users.filter((prop) =>
    [
      prop.username,
      prop.email,
      ].some(field => field?.toString().toLowerCase().includes(search.toLowerCase()))
  );
  

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
     <AdminNavbar/>
   <div className="mainalluseradmincontrol">
     <div className="admintable">
      <h2 className='headuser'>User List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Name,email"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchbox"
      />

      {/* Table */}
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Avatar</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((prop, index) => (
            <tr key={prop._id}>
              <td>{index + 1 + indexOfFirstRow}</td>
              <td>{prop.username}</td>
              <td>{prop.email}</td>
              <td style={{textAlign:"center"}}><img src={prop.avatar||"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="profile" style={{width:"3rem",height:"3rem",borderRadius:"50%",objectFit:"cover",cursor:"pointer"}}/></td>
              <td >
                
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
          disabled={indexOfLastRow >= filteredUsers.length}
        >
          Next
        </button>
      </div>
    </div>
   </div>
   </>
  );
};

export default TableUser;
