import React, { useState } from 'react';
import api from '../api';

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('listFile', file); 

    try {
      const res = await api.post('/lists/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(res.data.msg);
      onUploadSuccess(); 
      setFile(null); 
      e.target.reset(); 
      setTimeout(() => setMessage(''), 5000);
    } catch (err) {
      setMessage(err.response?.data?.msg || 'File upload failed!');
    }
  };

  return (
    <div>
      <h3>Upload & Distribute List</h3>
      <p>Accepts .csv, .xlsx, .xls files.</p>
      <form onSubmit={onSubmit}>
        {message && <p>{message}</p>}
        <div className="form-group">
          <input type="file" onChange={onFileChange} accept=".csv, .xlsx, .xls" />
        </div>
        <button type="submit">Upload and Distribute</button>
      </form>
    </div>
  );
};

export default FileUploader;