// src/pages/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    navigate('/client-dashboard');
  };

  const handleContractorLogin = () => {
    navigate('/contractor-dashboard');
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleClientLogin}>Client Login</button>
      <button onClick={handleContractorLogin}>Contractor Login</button>
    </div>
  );
};

export default Login;
