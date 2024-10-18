import React from "react";
import { Button, Typography, Row, Col } from "antd";
import Lottie from "lottie-react";
import clientAnimation from "../assets/client.json"; // Add your animation JSON files
import contractorAnimation from "../assets/contractor.json"; // Add your animation JSON files
import "../styling/AdminDashboard.css"; // Custom CSS for styling
import Footer from "../components/Footer"; // Ensure the correct casing
const { Title } = Typography;

const AdminDashboard = () => {
  const handleCreateClient = () => {
    alert("Redirecting to Create Client Profile...");
    // Implement navigation logic here
  };

  const handleCreateContractor = () => {
    alert("Redirecting to Create Contractor Profile...");
    // Implement navigation logic here
  };

  return (
    <div className="admin-dashboard">
      <Title level={1} className="dashboard-header">
        Welcome to the Admin Dashboard
      </Title>
      <Row gutter={32} className="section-row">
        {/* Client Section */}
        <Col xs={24} md={12} className="section-container">
          <Lottie
            animationData={clientAnimation}
            loop={true}
            className="lottie-animation"
          />
          <Button
            type="primary"
            size="large"
            onClick={handleCreateClient}
            className="dashboard-button"
          >
            Create Client Profile
          </Button>
        </Col>

        {/* Contractor Section */}
        <Col xs={24} md={12} className="section-container">
          <Lottie
            animationData={contractorAnimation}
            loop={true}
            className="lottie-animation"
          />
          <Button
            type="primary"
            size="large"
            onClick={handleCreateContractor}
            className="dashboard-button"
          >
            Create Contractor Profile
          </Button>
        </Col>
      </Row>
      <Footer className="footer" />{" "}
      {/* Include Footer inside the return statement */}
    </div>
  );
};

export default AdminDashboard;
