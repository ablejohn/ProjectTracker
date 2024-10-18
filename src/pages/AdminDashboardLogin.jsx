// src/pages/AdminDashboardLogin.jsx
import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../styling/AdminDashboard.css"; // Optional: Add custom CSS

const { Title } = Typography;

const AdminDashboardLogin = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Admin Login Successful!");
    navigate("/admin-dashboard"); // Redirect to Admin Dashboard on successful login
  };

  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">
        Admin Dashboard Login
      </Title>
      <p>Please enter your credentials to access the Admin Dashboard.</p>

      <Form
        name="adminLoginForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "20px auto" }}
      >
        <Form.Item
          label="Company Name"
          name="companyName"
          rules={[
            { required: true, message: "Please enter the company name!" },
          ]}
        >
          <Input placeholder="Enter Company Name" />
        </Form.Item>

        <Form.Item
          label="Unique ID"
          name="uniqueId"
          rules={[{ required: true, message: "Please enter the unique ID!" }]}
        >
          <Input placeholder="Enter Unique ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminDashboardLogin;
