import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
// FIXED: Changed from 'react-react-chartjs-2' to 'react-chartjs-2'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CostVsGrowthChart = ({ debts = [], reserves = [], logs = [] }) => {
  const months = ['Current', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];

  const totalDebt = debts.reduce((sum, d) => sum + (parseFloat(d.balance) || 0), 0);
  const totalSavings = reserves.reduce((sum, r) => sum + (parseFloat(r.currentStanding) || 0), 0);
  
  const totalIncome = logs.filter(l => l.type === 'INCOME').reduce((sum, l) => sum + l.amount, 0);
  const totalExpenses = logs.filter(l => l.type === 'EXPENSE').reduce((sum, l) => sum + l.amount, 0);
  const netCashFlow = totalIncome - totalExpenses;

  const debtTrendData = months.map((_, index) => {
    const reduction = netCashFlow < 0 ? 0 : (netCashFlow * 0.4) * index; 
    return Math.max(0, totalDebt - reduction);
  });

  const savingsTrendData = months.map((_, index) => {
    const growth = netCashFlow > 0 ? (netCashFlow * 0.6) * index : 0;
    return totalSavings + growth;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Outstanding Liabilities',
        data: debtTrendData,
        borderColor: '#f87171',
        backgroundColor: 'rgba(248, 113, 113, 0.02)',
        borderWidth: 2,
        pointBackgroundColor: '#f87171',
        pointBorderColor: '#0d1426',
        pointHoverRadius: 5,
        tension: 0.25,
        fill: true,
      },
      {
        label: 'Savings & Reserves',
        data: savingsTrendData,
        borderColor: '#34d399',
        backgroundColor: 'rgba(52, 211, 153, 0.02)',
        borderWidth: 2,
        pointBackgroundColor: '#34d399',
        pointBorderColor: '#0d1426',
        pointHoverRadius: 5,
        tension: 0.25,
        fill: true,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8',
          font: { 
            size: 12, 
            weight: '500', 
            family: '"Plus Jakarta Sans", sans-serif' 
          },
          boxWidth: 8,
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: '#0d1426',
        titleColor: '#94a3b8',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.08)',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        titleFont: { family: '"Plus Jakarta Sans", sans-serif', weight: '600' },
        bodyFont: { family: '"JetBrains Mono", monospace' },
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { 
          color: '#64748b', 
          font: { size: 11, family: '"Plus Jakarta Sans", sans-serif' } 
        }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.03)' },
        ticks: {
          color: '#64748b',
          font: { size: 11, family: '"JetBrains Mono", monospace' },
          callback: (value) => 'KES ' + value.toLocaleString()
        }
      }
    }
  };

  if (totalDebt === 0 && totalSavings === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        color: '#64748b', 
        fontSize: '14px',
        fontFamily: '"Plus Jakarta Sans", sans-serif'
      }}>
        Awaiting transaction logs to project metrics...
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CostVsGrowthChart;