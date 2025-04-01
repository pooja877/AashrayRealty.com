import './Booking.css';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AdminNavbar from '../adminNavbar/AdminNavbar';

const Renting = () => {
//   const navigate = useNavigate();
  const [rentings, setRentings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/rent/all");
        const data = await response.json();
        setRentings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this renting?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/rent/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking deleted successfully");
        setRentings(rentings.filter(booking => booking._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const handleViewHistory = (history) => {
    if (!history || history.length === 0) {
      alert("No payment history available.");
      return;
    }
  
    const historyDetails = history
      .map(h => `Date: ${new Date(h.date).toLocaleDateString()} - Payment ID: ${h.paymentId}`)
      .join("\n");
  
    alert(`Payment History:\n${historyDetails}`);
  };
  
 

  // Filter bookings based on search input
  const filteredRentingRecords = rentings.filter((record) =>
    [
      record.userId,
      record.propertyId,
      record.rentAmount,
      record.dueDate,
      record.lastPaymentDate,
    ].some(field => field?.toString().toLowerCase().includes(search.toLowerCase()))
  );


  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentBookings = filteredRentingRecords.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <AdminNavbar />
      <div className="mainalladminbook">
        <div className="adminbook-container">
          <h2 className='adminbook-title'>All Rent Records</h2>

          {/* Search Box */}
          <input
            type="text"
            placeholder="Search by User, Property, Status"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="adminbook-search"
          />

          {/* Table */}
          <table className="adminbook-table">
          <thead>
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Property ID</th>
                <th>Rent Start Date</th>
                <th>Rent End Date</th>
                <th>Rent Amount</th>
                <th>Due Date</th>
                <th>Payment History</th> 
                <th>Last Payment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentBookings.map((record, index) => (
               <tr key={record._id}>
                  <td>{index + 1 + indexOfFirstRow}</td>
                  <td>{record.userId}</td>
                  <td>{record.propertyId}</td>
                  <td>{new Date(record.rentStartDate).toLocaleDateString()}</td> 
                  <td>{new Date(record.rentEndDate).toLocaleDateString()}</td> 
                  <td>₹{(record.rentAmount ).toFixed(2)}</td>
                  <td>{new Date(record.dueDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleViewHistory(record.paymentHistory)} className="adminbook-history-btn">
                        View History
                    </button>
                    </td>
                  <td>{record.lastPaymentDate ? new Date(record.lastPaymentDate).toLocaleDateString() : "-"}</td>
                  <td>
                    <button onClick={() => handleDelete(record._id)} className="adminbook-delete-btn">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="adminbook-pagination">
            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={indexOfLastRow >= filteredRentingRecords.length}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Renting;
