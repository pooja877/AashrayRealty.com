// import  { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels";

// // Register chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

// const Monthlybookingchart = () => {
//   const [bookingData, setBookingData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await axios.get("/api/book/monthly-bookings"); // Your API route
//       setBookingData(res.data);
//     };
//     fetchData();
//   }, []);

//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//   const chartData = {
//     labels: months,
//     datasets: [
//       {
//         label: "Total Bookings",
//         data: months.map((_, idx) => {
//           const monthStat = bookingData.find(stat => stat._id.month === idx + 1);
//           return monthStat ? monthStat.totalBookings : 0;
//         }),
//         backgroundColor: "rgba(40, 145, 145, 0.7)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//       }
//     ]
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { display: false },
//       tooltip: {
//         callbacks: {
//           label: function(context) {
//             return `Bookings: ${context.raw}`;
//           }
//         }
//       },
//       datalabels: {
//         anchor: 'end',
//         align: 'top',
//         color: '#000',
//         font: {
//           weight: 'bold',
//           size: 12,
//         },
//         formatter: (value) => value, // Show number
//       }
//     },
//     scales: {
//       y: {
//         beginAtZero: true,
//         ticks: {
//           stepSize: 1,
//         }
//       }
//     }
//   };

//   return (
//     <div style={{ width: "90%", margin: "auto" }}>
//       <h2>Monthly Property Bookings</h2>
//       <Bar data={chartData} options={options} />
//     </div>
//   );
// };

// export default Monthlybookingchart;
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useNavigate } from 'react-router-dom';

// Register chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const Monthlybookingchart = () => {
  const [bookingData, setBookingData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("/api/book/monthly-bookings");
      setBookingData(res.data);
    };
    fetchData();
  }, []);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Total Bookings",
        data: months.map((_, idx) => {
          const monthStat = bookingData.find(stat => stat._id.month === idx + 1);
          return monthStat ? monthStat.totalBookings : 0;
        }),
        backgroundColor: "rgba(40, 145, 145, 0.7)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `Bookings: ${context.raw}`;
          }
        }
      },
      datalabels: {
        anchor: 'end',
        align: 'top',
        color: '#000',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => value,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      }
    },
    onClick: (e) => {
      const activePoint = e.chart.tooltip._active[0];
      if (activePoint) {
        const monthIndex = activePoint.index;
        navigate(`/admin/bookings/${months[monthIndex]}`); // Navigate to Booking page with the selected month
      }
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <h2>Monthly Property Bookings</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default Monthlybookingchart;
