import './Booking.css';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import AdminNavbar from '../adminNavbar/AdminNavbar';

const Booking = () => {
//   const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/book/all");
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this booking?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/book/delete/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();
      if (response.ok) {
        alert("Booking deleted successfully");
        setBookings(bookings.filter(booking => booking._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  // Filter bookings based on search input
  const filteredBookings = bookings.filter((booking) =>
    [
      booking.userId, 
      booking.propertyId, 
      booking.paymentId, 
      booking.orderId, 
      booking.status,
      booking.bookedAt
    ].some(field => field?.toString().toLowerCase().includes(search.toLowerCase()))
  );

  // Paginate data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <>
      <AdminNavbar />
  <div className="mainalladminbook">
      <div className="adminbook-container">
        <h2 className='adminbook-title'>All Bookings</h2>

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
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Token Amount</th>
              <th>Status</th>
              <th>Booked At</th>
              <th>Cancelled At</th>
              <th>Expires At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1 + indexOfFirstRow}</td>
                <td>{booking.userId}</td>
                <td>{booking.propertyId}</td>
                <td>{booking.paymentId}</td>
                <td>{booking.orderId}</td>
                <td>₹{booking.tokenAmount.toFixed(2)}</td>
                <td>{booking.status}</td>
                <td>{new Date(booking.bookedAt).toLocaleDateString()}</td>
                <td>{booking.cancelledAt ? new Date(booking.cancelledAt).toLocaleDateString() : "-"}</td>
                <td>{new Date(booking.expiresAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(booking._id)} className="adminbook-delete-btn">
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
            disabled={indexOfLastRow >= filteredBookings.length}
          >
            Next
          </button>
        </div>
      </div>
      </div>
    </>
  );
};

export default Booking;
