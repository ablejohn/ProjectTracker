import React from "react";
import { Button, Typography, Row, Col } from "antd";
import Lottie from "lottie-react";
import clientAnimation from "../assets/client.json";
import contractorAnimation from "../assets/contractor.json";
import "../styling/AdminDashboard.css";
import Footer from "../components/footer";
import BackButton from "../components/backbutton";

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
        <BackButton />
      </Row>

      <Footer className="footer" />
    </div>
  );
};

export default AdminDashboard;
