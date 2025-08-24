import React from 'react';

const AgentList = ({ agents }) => {
  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Current Agents ({agents.length})</h3>
      {agents.length > 0 ? (
        <ul>
          {agents.map((agent) => (
            <li key={agent._id}>
              <strong>{agent.name}</strong> - {agent.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No agents found. Add one above!</p>
      )}
    </div>
  );
};

export default AgentList;