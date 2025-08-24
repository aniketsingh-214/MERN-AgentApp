import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import AddAgentForm from '../components/AddAgentForm';
import AgentList from '../components/AgentList';
import FileUploader from '../components/FileUploader';
import DistributedLists from '../components/DistributedLists';

const Dashboard = () => {
  const [agents, setAgents] = useState([]);
  const [distributedLists, setDistributedLists] = useState({});
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const agentsRes = await api.get('/agents');
      setAgents(agentsRes.data);

      const listsRes = await api.get('/lists/distributed');
      setDistributedLists(listsRes.data);
    } catch (error) {
      console.error('Failed to fetch data', error);
      if (error.response && error.response.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  const refreshData = () => {
      fetchData();
  };

  return (
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Admin Dashboard</h2>
          <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="dashboard-sections">
        <div className="section">
            <AddAgentForm onAgentAdded={refreshData} />
            <AgentList agents={agents} />
        </div>
        <div className="section">
            <FileUploader onUploadSuccess={refreshData} />
        </div>
      </div>
      
      <div className="distributed-lists section">
        <DistributedLists lists={distributedLists} />
      </div>
    </div>
  );
};

export default Dashboard;