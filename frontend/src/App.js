import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(setAgents);
  }, []);

  const handleAddAgent = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/agents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, status: 'available' })
    });
    const newAgent = await res.json();
    setAgents(prev => [...prev, newAgent]);
    setName('');
  };

  return (
    <div className="App">
      <h1>AI Agent Lending</h1>
      <form onSubmit={handleAddAgent}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Agent Name"
          required
        />
        <button type="submit">Add Agent</button>
      </form>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>
            {agent.name} - {agent.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
