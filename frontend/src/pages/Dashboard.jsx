import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { fetchMyProjects } from '../store/slices/projectsSlice.js';
import '../UI/Dashboard.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchMyProjects());
  }, [dispatch]);

  const totalProjects = items.length;
  const openProjects = items.filter(p => p.status === 'open').length;
  const closedProjects = items.filter(p => p.status === 'closed').length;
  const totalCapitalRaised = items.reduce((sum, p) => sum + (p.investedAmount || 0), 0);

  const doughnutData = {
    labels: ['Open Projects', 'Closed Projects'],
    datasets: [
      {
        data: [openProjects, closedProjects],
        backgroundColor: ['#22c55e', '#ef4444'],
        borderColor: ['#ffffff', '#ffffff'],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: items.slice(0, 7).map(p => p.title || p.name || 'Unnamed'),
    datasets: [
      {
        label: 'Capital Raised ($)',
        data: items.slice(0, 7).map(p => p.investedAmount || 0),
        backgroundColor: '#2563eb',
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => '$' + value.toLocaleString(),
        },
      },
    },
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-value">{totalProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Open Projects</h3>
          <p className="stat-value">{openProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Closed Projects</h3>
          <p className="stat-value">{closedProjects}</p>
        </div>
        <div className="stat-card">
          <h3>Total Capital Raised</h3>
          <p className="stat-value">${totalCapitalRaised.toLocaleString()}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Project Status Distribution</h3>
          <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Capital Raised per Project</h3>
          <div style={{ height: '280px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
