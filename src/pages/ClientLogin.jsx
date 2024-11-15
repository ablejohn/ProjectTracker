import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import "../styling/AllLogin.css"; // Optional: Add custom CSS
import BackButton from "../Components/backbutton";
import axios from "axios"; // Axios for making API calls

const { Title } = Typography;

const ClientDashboard = () => {
  const [loading, setLoading] = useState(false); // For handling loading state
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // Send login request to the backend with the entered client name and project title
      const response = await axios.post(
        "http://localhost:5000/api/clients/login",
        values
      );

      if (response.status === 200) {
        message.success("Login successful!");
        navigate("/client-dashboard");
      }
    } catch (error) {
      message.error("Invalid credentials. Please try again.");
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
          Welcome to your project dashboard. Here you'll see project updates.
        </p>

        <Form
          name="clientForm"
          onFinish={onFinish}
          layout="vertical"
          style={{ maxWidth: 400, margin: "20px auto" }}
        >
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input placeholder="Enter Client Name" />
          </Form.Item>

          <Form.Item
            label="Project Title"
            name="projectTitle"
            rules={[
              { required: true, message: "Please enter the Project Title!" },
            ]}
          >
            <Input placeholder="Enter Project Title" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <BackButton />
    </div>
  );
};

export default ClientDashboard;
