import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function RentCharts( {monthlyRentCollection = {}, paidRent = 0, dueRent = 0, activeRentals = 0, expiredRentals = 0, topUsers = [] }) {
    console.log("RentCharts Props:", { monthlyRentCollection, paidRent, dueRent, activeRentals, expiredRentals, topUsers });

    // Convert monthly rent collection to an array for Recharts
    const monthlyData = Object.keys(monthlyRentCollection).map(month => ({
        month,
        rent: monthlyRentCollection[month] || 0
    }));

    return (
        <div className="admindas-charts">
            {/* Monthly Rent Collection Chart */}
            <div className="admindas-chart-box">
                <h3>Monthly Rent Collection</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={monthlyData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="rent" fill="#0088FE" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Rent Paid vs Due Chart */}
            <div className="admindas-chart-box">
                <h3>Rent Paid vs Due</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Paid Rent", value: paidRent },
                                { name: "Due Rent", value: dueRent }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                        >
                            <Cell fill="#00C49F" />
                            <Cell fill="#FF8042" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Active vs Expired Rentals Chart */}
            <div className="admindas-chart-box">
                <h3>Active vs Expired Rentals</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie
                            data={[
                                { name: "Active Rentals", value: activeRentals },
                                { name: "Expired Rentals", value: expiredRentals }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                        >
                            <Cell fill="#0088FE" />
                            <Cell fill="#FFBB28" />
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Top 5 Users by Rent Payments */}
            <div className="admindas-chart-box">
                <h3>Top 5 Users by Rent Payments</h3>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={topUsers}>
                    <XAxis dataKey="name" tickFormatter={(name) => name || "Unknown"} />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="totalPaid" fill="#FF8042" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default RentCharts;
