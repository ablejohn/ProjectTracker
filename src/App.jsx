// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientDashboard from "./pages/ClientDashboard";
import ContractorDashboard from "./pages/ContractorDashboard";
import Login from "./pages/Login";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route
            path="/contractor-dashboard"
            element={<ContractorDashboard />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
