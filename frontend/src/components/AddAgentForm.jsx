import React, { useState } from 'react';
import api from '../api';

const AddAgentForm = ({ onAgentAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const { name, email, mobile, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/agents', formData);
      setMessage(`Agent "${name}" created successfully!`);
      setFormData({ name: '', email: '', mobile: '', password: '' }); 
      onAgentAdded();
      setTimeout(() => setMessage(''), 3000); 
    } catch (err) {
      setMessage(err.response?.data?.msg || 'Failed to create agent.');
    }
  };

  return (
    <div>
      <h3>Add New Agent</h3>
      <form onSubmit={onSubmit}>
        {message && <p>{message}</p>}
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Mobile (e.g., +911234567890)" name="mobile" value={mobile} onChange={onChange} required />
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Add Agent</button>
      </form>
    </div>
  );
};

export default AddAgentForm;