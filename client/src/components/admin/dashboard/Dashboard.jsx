import  { useEffect, useState } from "react";
import "./Dashboard.css";
import AdminNavbar from '../adminNavbar/AdminNavbar';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Dashboard = () => {
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch properties and users from backend
        const fetchData = async () => {
            try {
                const propertyRes = await fetch("/api/property/all");
                const userRes = await fetch("/api/user/all");

                const propertyData = await propertyRes.json();
                const userData = await userRes.json();

                setProperties(propertyData);
                setUsers(userData);
                setTotalProperties(propertyData.length);
                setTotalUsers(userData.length);

                // Process data for charts
                const residentialCount = propertyData.filter(p => p.propertyType === "Residential").length;
                const commercialCount = propertyData.filter(p => p.propertyType === "Commercial").length;
                const apartmentCount = propertyData.filter(p => p.propertyType === "Apartment/Flat").length;
                const buyCount = propertyData.filter(p => p.transactionType === "Buy").length;
                const rentCount = propertyData.filter(p => p.transactionType === "Rent").length;

                // Render Property Type Bar Chart
                const propertyTypeCtx = document.getElementById("admindas-propertyTypeChart").getContext("2d");
                new Chart(propertyTypeCtx, {
                    type: "bar",
                    data: {
                        labels: ["Residential", "Commercial", "Apartment"],
                        datasets: [{
                            label: "Properties",
                            data: [residentialCount, commercialCount, apartmentCount],
                            backgroundColor: ["#4CAF50", "#FF9800", "#2196F3"]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { display: false } }
                    }
                });

                // Render Transaction Type Pie Chart
                const transactionTypeCtx = document.getElementById("admindas-transactionTypeChart").getContext("2d");
                new Chart(transactionTypeCtx, {
                    type: "pie",
                    data: {
                        labels: ["Buy", "Rent"],
                        datasets: [{
                            data: [buyCount, rentCount],
                            backgroundColor: ["#007bff", "#f44336"]
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: { legend: { position: "bottom" } }
                    }
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <AdminNavbar/>
        <div className="mainadmindashboard">
            <div className="admindas-container">
            <h2 className="admindas-title">AashrayRealty Dashboard</h2>

            <div className="admindas-dashboard">
                <div className="admindas-box">
                    <i className="fas fa-building admindas-icon"></i>
                    <h3>Total Properties</h3>
                    <div className="admindas-number">{totalProperties}</div>
                </div>

                <div className="admindas-box">
                    <i className="fas fa-users admindas-icon"></i>
                    <h3>Total Users</h3>
                    <div className="admindas-number">{totalUsers}</div>
                </div>
            </div>

            <div className="admindas-charts">
                <div className="admindas-chart-box">
                <h3>Property Type</h3>
                    <canvas id="admindas-propertyTypeChart"></canvas>
                </div>
                <div className="admindas-chart-box">
                <h3>Transaction Type</h3>
                    <canvas id="admindas-transactionTypeChart"></canvas>
                </div>
            </div>
        </div>
        </div>
        </>
    );
};

export default Dashboard;
