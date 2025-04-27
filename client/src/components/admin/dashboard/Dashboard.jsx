
import { useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import AdminNavbar from "../adminNavbar/AdminNavbar";
import { Chart, registerables } from "chart.js";
import BookingChart from "../BookingCharts/BookingChart";
// import RentCharts from "../BookingCharts/RentCharts";
import PropertyStats from "../BookingCharts/PropertyStats";
import { FaHome } from "react-icons/fa";


Chart.register(...registerables);

const Dashboard = () => {
    const [totalProperties, setTotalProperties] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const propertyChartRef = useRef(null);
    const transactionChartRef = useRef(null);
    const propertyChartInstance = useRef(null);
    const transactionChartInstance = useRef(null);
    const [rentStats, setRentStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/rent/rent-stats");
                const data = await response.json();
                setRentStats(data);
            } catch (error) {
                console.error("Error fetching rent stats:", error);
            }
        };
        fetchStats();
    }, []);

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propertyRes = await fetch("/api/property/getall");
                const userRes = await fetch("/api/user/all");

                const propertyData = await propertyRes.json();
                const userData = await userRes.json();

                setProperties(propertyData);
                setUsers(userData);
                setTotalProperties(propertyData.length);
                setTotalUsers(userData.length);

                const residentialCount = propertyData.filter(p => p.propertyType === "Residential").length;
                const commercialCount = propertyData.filter(p => p.propertyType === "Commercial").length;
                const apartmentCount = propertyData.filter(p => p.propertyType === "Apartment/Flat").length;
                const buyCount = propertyData.filter(p => p.transactionType === "Buy").length;
                const rentCount = propertyData.filter(p => p.transactionType === "Rent").length;

                // Destroy previous chart instance before creating a new one
                if (propertyChartInstance.current) propertyChartInstance.current.destroy();
                if (transactionChartInstance.current) transactionChartInstance.current.destroy();

                // Render Property Type Bar Chart
                if (propertyChartRef.current) {
                    propertyChartInstance.current = new Chart(propertyChartRef.current, {
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
                            plugins: { legend: { display: false } },
                            scales: { y: { beginAtZero: true } }
                        }
                    });
                }

                // Render Transaction Type Pie Chart
                if (transactionChartRef.current) {
                    transactionChartInstance.current = new Chart(transactionChartRef.current, {
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
                }

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);
    // if (!rentStats) return <p>Loading...</p>;

    return (
        <>
        <AdminNavbar/>
        <div className="mainadmindashboard">
            <div className="admindas-container">
                <h2 className="admindas-title"><FaHome style={{fontSize:"30px"}}/> Dashboard</h2>

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
                        <canvas ref={propertyChartRef}></canvas>
                    </div>
                    <div className="admindas-chart-box">
                        <h3>Transaction Type</h3>
                        <canvas ref={transactionChartRef}></canvas>
                    </div>
                </div>
                <BookingChart/>
                {/* {rentStats ? (
                        <RentCharts 
                            monthlyRentCollection={rentStats?.monthlyRentCollection || {}} 
                            paidRent={rentStats?.paidRent || 0} 
                            dueRent={rentStats?.dueRent || 0} 
                            activeRentals={rentStats?.activeRentals || 0} 
                            expiredRentals={rentStats?.expiredRentals || 0} 
                            topUsers={rentStats?.topUsers || []} 
                        />
                    ) : (
                        <p>Loading Rent Data...</p>
                    )} */}
                    <PropertyStats/>
            </div>
          
        </div>
        </>
    );
};

export default Dashboard;
