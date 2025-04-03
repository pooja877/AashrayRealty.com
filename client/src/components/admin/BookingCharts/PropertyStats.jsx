import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PropertyStats = () => {
  const [stats, setStats] = useState({ approvedCount: 0, pendingCount: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/userproperties/stats");
        const data = await response.json();
        setStats({ approvedCount: data.approvedCount, pendingCount: data.pendingCount });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      {/* Pie Chart for Approved vs Pending */}
      <div style={{ width: "320px", textAlign: "center" }}>
        <h3>User uploaded Property Status</h3>
        <Pie
          data={{
            labels: ["Approved", "Pending"],
            datasets: [
              {
                data: [stats.approvedCount, stats.pendingCount],
                backgroundColor: ["#28a745", "#dc3545"], // Green for Approved, Red for Pending
                hoverOffset: 8,
              },
            ],
          }}
          options={{
            plugins: { legend: { position: "bottom" } },
            responsive: true,
            maintainAspectRatio: false,
          }}
          style={{ maxHeight: "280px" }}
        />
      </div>
    </div>
  );
};

export default PropertyStats;
