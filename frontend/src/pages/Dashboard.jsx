import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchProjects } from '../store/slices/projectSlice';
import '../UI/dashboard.css';

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { items, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    // dispatch(fetchProjects());
  }, [dispatch]);

  // const totalProjects = items.length;
  // const openProjects = items.filter(p => p.status === 'open').length;
  // const closedProjects = items.filter(p => p.status === 'closed').length;
  // const totalCapitalRaised = items.reduce((sum, p) => sum + (p.investedAmount || 0), 0);

  // if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <p className="stat-value">23</p>
        </div>
        <div className="stat-card">
          <h3>Open Projects</h3>
          <p className="stat-value">15</p>
        </div>
        <div className="stat-card">
          <h3>Closed Projects</h3>
          <p className="stat-value">8</p>
        </div>
        <div className="stat-card">
          <h3>Total Capital Raised</h3>
          <p className="stat-value">$250,000</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
