import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
// import { fetchProjectInvestors, fetchProjectById } from '../store/slices/projectSlice';

const Investors = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { investors, selectedProject, loading } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjectInvestors(id));
    if (!selectedProject) {
      dispatch(fetchProjectById(id));
    }
  }, [id, dispatch, selectedProject]);

  if (loading) return <div>Loading investors...</div>;

  return (
    <div className="investors-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-btn">← Back to Project</button>
        <h1>Investors for {selectedProject?.title}</h1>
      </div>

      <div className="investors-table-container">
        {investors.length > 0 ? (
          <table className="investors-table">
            <thead>
              <tr>
                <th>Investor Name</th>
                <th>Amount Invested</th>
                <th>Capital Share (%)</th>
              </tr>
            </thead>
            <tbody>
              {investors.map((investor, index) => (
                <tr key={index}>
                  <td>{investor.user?.name || 'Anonymous'}</td>
                  <td>${investor.amount?.toLocaleString()}</td>
                  <td>{((investor.amount / (selectedProject?.capital || 1)) * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data">No investors found for this project.</p>
        )}
      </div>
    </div>
  );
};

export default Investors;
