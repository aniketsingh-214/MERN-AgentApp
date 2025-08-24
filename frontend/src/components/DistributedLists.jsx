import React from 'react';

const DistributedLists = ({ lists }) => {
  const agentNames = Object.keys(lists);

  return (
    <div>
      <h2>Distributed Tasks</h2>
      {agentNames.length > 0 ? (
        agentNames.map((agentName) => (
          <div key={agentName} className="agent-task-list">
            <h3>Tasks for {agentName} ({lists[agentName].length})</h3>
            <ul>
              {lists[agentName].map((task) => (
                <li key={task._id}>
                  <strong>Name:</strong> {task.firstName} | <strong>Phone:</strong> {task.phone} | <strong>Notes:</strong> {task.notes}
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No tasks have been distributed yet. Upload a list to begin.</p>
      )}
    </div>
  );
};

export default DistributedLists;