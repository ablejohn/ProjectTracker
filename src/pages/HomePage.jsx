import React from "react";
import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import welcomeAnimation from "../assets/welcome.json"; // Ensure the correct path
import Footer from "../components/footer"; // Import Footer component
import "../styling/HomePage.css"; // Custom CSS for styling

const { Title, Paragraph } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const handleClientLogin = () => {
    navigate("/client-dashboard");
  };

  const handleContractorLogin = () => {
    navigate("/contractor-dashboard");
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
        <Paragraph>
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

          {/* Add Client Button */}
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/admin-dashboard-login")} // Update the onClick to navigate to Admin Dashboard
            className="login-button"
            style={{ marginTop: "16px" }} // Optional: Add spacing
          >
            Admin Dashboard
          </Button>
        </div>
      </div>
      <Footer /> {/* Include the Footer component here */}
    </div>
  );
};

export default Login;
