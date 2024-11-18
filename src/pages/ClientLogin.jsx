import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../styling/AllLogin.css";
import BackButton from "../Components/backbutton";
import axios from "axios";

const { Title } = Typography;

const ClientDashboard = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log("Sending login request with data:", values);

      const response = await axios.post(
        "http://localhost:5000/api/clients/login",
        values
      );

      console.log("Server response:", response.data);

      if (response.status === 200) {
        message.success("Login successful!");
        navigate("/client-dashboard");
      }
    } catch (error) {
      console.log("Login attempt failed with values:", values);
      console.log("Error details:", error.response?.data);
      message.error(
        error.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="content-area">
        <Title level={2} className="dashboard-title">
          Client Login
        </Title>

        <p className="dashboard-paragraph">
          Please enter your email and Project ID to access your dashboard.
        </p>

        <Form
          name="clientForm"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, margin: "20px auto" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Project ID"
            name="projectId"
            rules={[
              { required: true, message: "Please enter your Project ID!" },
            ]}
          >
            <Input placeholder="Enter your Project ID" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div className="signup-link">
          <p>
            No account? <Link to="/admin-dashboard">Sign up</Link>
          </p>
        </div>
      </div>
      <BackButton />
    </div>
  );
};

export default ClientDashboard;
