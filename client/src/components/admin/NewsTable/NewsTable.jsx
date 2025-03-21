import './NewsTable.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AdminNavbar from '../adminNavbar/AdminNavbar';
const NewsTable = () => {
    const navigate=useNavigate();
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchProperties = async () => {
        try {
            const response = await fetch("/api/news/all");
            const data = await response.json();
            setNews(data);
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
    };

    fetchProperties();
}, []);
const handleDelete=async(id)=>{
    try {
      const response = await fetch(`/api/news/delete/${id}`, {
          method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
          alert("Property deleted successfully");
          setNews(news.filter(news => news._id !== id));
      } else {
          alert(data.message);
      }
  } catch (error) {
      console.error("Error deleting property:", error);
  }
  }

  // Filter properties based on search input

const filteredNews = news.filter((prop) =>
    [
      prop.title,
      prop.category,
      prop.date,
      ].some(field => field?.toString().toLowerCase().includes(search.toLowerCase()))
  );
  

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentProperties = filteredNews.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
     <AdminNavbar/>
       
   <div className="mainalladmincontrol">
   <div className="divaddnewscontain">
   <div id='addddNews'onClick={()=>{navigate('/admin/addNews')}}>Add news</div>
   </div>
     <div className="admin-table">
      <h2 className='headpro'>News List</h2>

      {/* Search Box */}
      <input
        type="text"
        placeholder="Search by Title,category,Date"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-box"
      />

      {/* Table */}
      <table >
        <thead>
          <tr>
            <th>#</th>
            <th>News Title</th>
            <th>description</th>
            <th>image</th>
            <th>category</th>
            <th>date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProperties.map((prop, index) => (
            <tr key={prop._id}>
              <td>{index + 1 + indexOfFirstRow}</td>
              <td>{prop.title}</td>
              <td>{prop.description}</td>
              <td style={{textAlign:"center"}}><img src={prop.image} alt="news" style={{width:"3rem",height:"3rem",objectFit:"cover",cursor:"pointer"}}/></td>
              <td>{prop.category}</td>
              <td>{prop.date}</td>
              <td >
                <button onClick={()=>navigate(`/admin/news/updatenews/${prop._id}`)} className="updateprobtn">
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
          disabled={indexOfLastRow >= filteredNews.length}
        >
          Next
        </button>
      </div>
    </div>
   </div>

   </>
  );
};

export default NewsTable;
