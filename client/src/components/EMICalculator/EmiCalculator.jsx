import  { useState } from "react";
import Chart from "chart.js/auto";
import "./EmiCalculator.css";

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [emiHistory, setEmiHistory] = useState([]);
  const [emiChart, setEmiChart] = useState(null);

  const updateValue = (setter, value) => setter(parseFloat(value));

  const calculateEMI = () => {
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;
    const emi =
      (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - loanAmount;

    setEmiHistory([...emiHistory, { loanAmount, interestRate, loanTerm, emi, totalPayment }]);

    if (emiChart) {
      emiChart.data.datasets[0].data = [loanAmount, totalInterest];
      emiChart.update();
    } else {
      const ctx = document.getElementById("emiPieChart").getContext("2d");
      setEmiChart(
        new Chart(ctx, {
          type: "pie",
          data: {
            labels: ["Principal", "Interest"],
            datasets: [
              {
                data: [loanAmount, totalInterest],
                backgroundColor: ["#36A2EB", "#FF6384"],
              },
            ],
          },
        })
      );
    }
  };

  return (
    <div className="maincontaincalemi">
      <div className="cal-container">
      <div className="cal-header">
        <h1>EMI Calculator</h1>
      </div>
      <div className="cal-content">
        <div className="cal-box">
          <h2>Calculate Your EMI</h2>
          <label>Loan Amount (₹): {loanAmount}</label>
          <input type="range" min="50000" max="500000" step="5000" value={loanAmount} onChange={(e) => updateValue(setLoanAmount, e.target.value)} />
          <label>Interest Rate (%): {interestRate}</label>
          <input type="range" min="1" max="20" step="0.1" value={interestRate} onChange={(e) => updateValue(setInterestRate, e.target.value)} />
          <label>Loan Term (Years): {loanTerm}</label>
          <input type="range" min="5" max="30" step="1" value={loanTerm} onChange={(e) => updateValue(setLoanTerm, e.target.value)} />
          <button className="calemi" onClick={calculateEMI}>Calculate EMI</button>
        </div>
        <div className="cal-data-box">
          <h2>EMI Details</h2>
          <p>Your monthly EMI is: <span>₹{(emiHistory.length > 0 ? emiHistory[emiHistory.length - 1].emi.toFixed(2) : 0)}</span></p>
          <canvas id="emiPieChart"></canvas>
        </div>
      </div>
      <div className="cal-history">
        <h2>EMI History</h2>
        <table className="caltable">
          <thead>
            <tr>
              <th>Loan Amount (₹)</th>
              <th>Interest Rate (%)</th>
              <th>Loan Term (Years)</th>
              <th>Monthly EMI (₹)</th>
              <th>Total Payment (₹)</th>
            </tr>
          </thead>
          <tbody>
            {emiHistory.map((entry, index) => (
              <tr key={index}>
                <td>₹{entry.loanAmount.toLocaleString()}</td>
                <td>{entry.interestRate}%</td>
                <td>{entry.loanTerm} Years</td>
                <td>₹{entry.emi.toFixed(2)}</td>
                <td>₹{entry.totalPayment.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default EMICalculator;
