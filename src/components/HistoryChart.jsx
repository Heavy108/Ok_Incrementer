import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale } from 'chart.js/auto';
import styles from '../styles/HistoryChart.module.css';

// Register the CategoryScale
Chart.register(CategoryScale);

const HistoryChart = ({ history }) => {
  const data = {
    labels: history.map((item) => item.date),
    datasets: [
      {
        label: 'OK Count',
        data: history.map((item) => item.count),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };

  return (
    // <div className={styles.chartContainer}>
    <>
      <h2 className={styles.chartTitle}>OK Count History</h2>
      <Line data={data} options={options} />
    
    </>
  );
};

export default HistoryChart;