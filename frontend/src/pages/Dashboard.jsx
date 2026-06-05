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
import { formatMoney } from '../utils/formatters.js';
import { fetchMyInvestments } from '../store/slices/investmentSlice.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const StatCard = ({ title, value }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <p className="stat-value">{value}</p>
    </div>
  );
};

const OwnerDashboard = ({ items }) => {
  const totalProjects = items.length;
  const openProjects = items.filter(p => p.status === 'open').length;
  const closedProjects = items.filter(p => p.status === 'closed').length;
  const totalCapitalRaised = items.reduce((sum, p) => sum + (p.initialInvestment || 0), 0);

  const doughnutData = {
    labels: ['Open', 'Closed'],
    datasets: [{
      data: [openProjects, closedProjects],
      backgroundColor: ['#22c55e', '#ef4444'],
      borderColor: ['#ffffff', '#ffffff'],
      borderWidth: 2,
    }],
  };

  const barData = {
    labels: items.slice(0, 7).map(p => p.title || 'Unnamed'),
    datasets: [{
      label: 'Capital levé (MAD)',
      data: items.slice(0, 7).map(p => p.initialInvestment || 0),
      backgroundColor: '#2563eb',
      borderRadius: 6,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => 'MAD ' + v.toLocaleString() },
      },
    },
  };

  return (
    <>
      <div className="stats-grid">
        <StatCard label="Total projets" value={totalProjects} />
        <StatCard label="Projets ouverts" value={openProjects} />
        <StatCard label="Projets fermés" value={closedProjects} />
        <StatCard label="Capital total levé" value={formatMoney(totalCapitalRaised)} />
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Statut des projets</h3>
          <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="chart-card">
          <h3>Capital levé par projet</h3>
          <div style={{ height: '280px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </>
  )

}

const InvestorDashboard = ({ investments }) => {
  const totalInvested = investments.reduce((sum, inv) => sum + (inv.amount || 0), 0);

  const projectInvestedIds = investments.map(inv => inv.project._id ); 
  const ids = new Set(projectInvestedIds);

  const topInvestments = investments.slice(0, 5).map(inv => ({
    title: inv.project.title || 'Unnamed',
    amount: inv.amount || 0,
  }));

  const barData = {
    labels: topInvestments.map(inv => inv.title || 'Projet'),
    datasets: [{
      label: 'Montant investi (MAD)',
      data: topInvestments.map(inv => inv.amount || 0),
      backgroundColor: '#7c3aed',
      borderRadius: 6,
    }],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (v) => 'MAD ' + v.toLocaleString() },
      },
    },
  };

  const doughnutData = {
    labels: topInvestments.map(inv => inv.title || 'Projet'),
    datasets: [{
      data: topInvestments.map(inv => inv.amount || 0),
      backgroundColor: [
        '#7c3aed', '#2563eb', '#22c55e', '#f59e0b',
        '#ef4444', '#06b6d4', '#ec4899',
      ],
      borderColor: '#ffffff',
      borderWidth: 2,
    }],
  };

  return (
    <>
      <div className="stats-grid">
        <StatCard title="Total investi" value={formatMoney(totalInvested)} />
        <StatCard title="Nombre d'investissements" value={investments.length} />
        <StatCard title="Projets investis" value={ids.size} />
        <StatCard title="Dernier investissement" value={investments.length > 0 ? formatMoney(investments[investments.length - 1].amount) : 'N/A'} />
      </div>
    
      {investments.length > 0 && (
        <div className="charts-container">
          <div className="chart-card">
            <h3>Répartition du portefeuille</h3>
            <div style={{ height: '280px', display: 'flex', justifyContent: 'center' }}>
              <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
          <div className="chart-card">
            <h3>Investissements par projet</h3>
            <div style={{ height: '280px' }}>
              <Bar data={barData} options={barOptions} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items, loading: projectsLoading } = useSelector((state) => state.projects);
  const { user } = useSelector((state) => state.auth);
  const { investments, loading: investmentsLoading } = useSelector((state) => state.investments);
  const isInvestor = user?.role === 'investor';

  useEffect(() => {
    if(user?.role === 'investor') {
      dispatch(fetchMyInvestments());
    }
    else {
      dispatch(fetchMyProjects());
    }
  }, [dispatch]);

  const loading = isInvestor ? investmentsLoading : projectsLoading;

  if (loading) return <div className="dashboard"><p>Loading projects...</p></div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      {
        user.role === 'owner' ? (
          <OwnerDashboard items={items} />
        ) : (
          <InvestorDashboard  investments={investments} />
        )
      }
    </div>
  );
};

export default Dashboard;
