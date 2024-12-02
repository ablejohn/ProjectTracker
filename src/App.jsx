import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientDashboard from "./pages/ClientLogin";
import ContractorDashboard from "./pages/ContractorLogin";
import AdminDashboardLogin from "./pages/AdminDashboardLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ContractorProfile from "./pages/ContractorProfile";
import ClientProfile from "./pages/ClientProfile";
import Login from "./pages/HomePage";
import NavBar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ContractorPortal from "./Components/ContractorPortal/ContractorPortal";
import ContractorClient from "./pages/ClientList";
import ClientContractor from "./pages/ContractorList";
import ClientPortal from "./Components/ClientPortal/ClientPortal";
import ThemeToggle from "./Components/ThemeToggle";

import "./App.css";
import "./styling/theme.css";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <ThemeToggle />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/client-dashboard-login" element={<ClientDashboard />} />
          <Route
            path="/contractor-dashboard-login"
            element={<ContractorDashboard />}
          />
          <Route
            path="/admin-dashboard-login"
            element={<AdminDashboardLogin />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/contractor-profile" element={<ContractorProfile />} />
          <Route path="/client-profile" element={<ClientProfile />} />
          <Route
            path="/contractor-dashboard/:contractorId"
            element={<ContractorPortal />}
          />
          <Route path="/contractor-client" element={<ContractorClient />} />
          <Route path="/client-contractor" element={<ClientContractor />} />
          <Route
            path="/client-dashboard/:clientId"
            element={<ClientPortal />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
