import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientDashboard from "./pages/ClientLogin";
import ContractorDashboard from "./pages/ContractorLogin";
import AdminDashboardLogin from "./pages/AdminDashboardLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContractorProfile from "./pages/ContractorProfile";
import ClientProfile from "./pages/ClientProfile";
import Login from "./pages/HomePage";
import ContractorPortal from "./components/ContractorPortal/ContractorPortal";
import NavBar from "./components/Navbar";
import Footer from "./components/footer";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route
            path="/contractor-dashboard"
            element={<ContractorDashboard />}
          />
          <Route
            path="/admin-dashboard-login"
            element={<AdminDashboardLogin />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/contractor-profile" element={<ContractorProfile />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route path="/contractor-portal" element={<ContractorPortal />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
