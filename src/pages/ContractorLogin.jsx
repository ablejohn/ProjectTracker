import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styling/AllLogin.css";
import BackButton from "../Components/backbutton";
import axios from "axios";

const { Title } = Typography;

const ContractorDashboard = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:5000/api/contractors/login",
        values
      );

      // Login successful
      message.success("Login successful!");
      navigate("/contractor-client");
    } catch (error) {
      // Handle errors
      if (error.response && error.response.status === 401) {
        message.error("Invalid credentials. Please try again.");
      } else {
        message.error("An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">
        Contractor Login
      </Title>
      <p className="dashboard-paragraph">
        Please enter your email and Contractor ID to access your dashboard.
      </p>

      <Form
        name="contractorForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "20px auto" }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please enter your email!" }]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Contractor ID"
          name="contractorId"
          rules={[{ required: true, message: "Please enter your ID!" }]}
        >
          <Input placeholder="Enter your Contractor ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="signup-link">
        <p>
          No account? <Link to="/admin-dashboard">Sign up</Link>
        </p>
      </div>

      <BackButton />
    </div>
  );
};

export default ContractorDashboard;
