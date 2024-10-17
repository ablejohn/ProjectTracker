import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import welcomeAnimation from "../assets/welcome.json"; // Ensure the correct path
import Footer from "../components/Footer"; // Import Footer component
import "../styling/Login.css"; // Custom CSS for styling

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    navigate("/client-dashboard");
  };

  const handleContractorLogin = () => {
    navigate("/contractor-dashboard");
  };

  return (
    <div className="login-page">
      <div className="animation-container">
        <Lottie animationData={welcomeAnimation} loop={true} />
      </div>
      <div className="content-container">
        <Title level={1}>Welcome to Project Tracker</Title>
        <Paragraph>
          Streamline your projects and track progress with ease. Choose your role to get started.
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
            type="default"
            size="large"
            onClick={handleContractorLogin}
            className="login-button"
          >
            Contractor Login
          </Button>
        </div>
      </div>
      <Footer /> {/* Include the Footer component here */}
    </div>
  );
};

export default Login;
