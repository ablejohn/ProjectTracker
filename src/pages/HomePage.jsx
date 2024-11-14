import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import welcomeAnimation from "../assets/welcome.json"; // Ensure the correct path
import "../styling/HomePage.css"; // Custom CSS for styling

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    navigate("/client-dashboard-login");
  };

  const handleContractorLogin = () => {
    navigate("/contractor-dashboard-login");
  };

  const handleAddClient = () => {
    navigate("/add-client");
  };

  return (
    <div className="login-page">
      <div className="animation-container">
        <Lottie animationData={welcomeAnimation} loop={true} />
      </div>
      <div className="content-container">
        <Title level={1}>Welcome to Project Tracker</Title>
        <Paragraph className="welcome-paragraph">
          Streamline your projects and track progress with ease. Choose your
          role to get started.
        </Paragraph>

        <div className="button-group">
          <Button
            type="primary"
            size="large"
            onClick={handleClientLogin}
            className="login-button"
          >
            Client Login
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={handleContractorLogin}
            className="login-button"
          >
            Contractor Login
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/admin-dashboard-login")} 
            className="login-button"
            style={{ marginTop: "16px" }} 
          >
            Admin Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
