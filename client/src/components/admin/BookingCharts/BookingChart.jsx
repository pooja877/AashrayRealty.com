import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import "./BookingChart.css"; // Import the CSS file

const BookingChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/book/all") // Adjust API URL
      .then((res) => res.json())
      .then((bookings) => {
        const statusCounts = { Pending: 0, Confirmed: 0, Cancelled: 0, Expired: 0 };
        let rentedCount = 0, notRentedCount = 0;

        bookings.forEach((booking) => {
          statusCounts[booking.status] += 1;
          booking.isRented ? rentedCount++ : notRentedCount++;
        });

        setData({
          statusData: Object.entries(statusCounts).map(([key, value]) => ({ name: key, value })),
          rentData: [
            { name: "Rented", value: rentedCount },
            { name: "Not Rented", value: notRentedCount }
          ]
        });
      })
      .catch((error) => console.error("Error fetching booking data:", error));
  }, []);

  const COLORS = ["#FFBB28", "#0088FE", "#FF8042", "#FF0000"];

  return (
    <div className="admindashchart-container">
      {/* Pie Chart for Booking Status */}
      <div className="admindashchart-box">
        <h2 className="admindashchart-title">Booking Status Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={data.statusData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
              {data.statusData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      {/* Bar Chart for Rent Status */}
      <div className="admindashchart-box">
        <h2 className="admindashchart-title">Rented vs Not Rented</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data.rentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BookingChart;
