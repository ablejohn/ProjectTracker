import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import "../styling/AllLogin.css";
import BackButton from "../Components/backbutton";
import { useNavigate } from "react-router-dom";
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
        Here you'll manage your clients and upload project updates.
      </p>

      <Form
        name="contractorForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "20px auto" }}
      >
        <Form.Item
          label="Contractor Name"
          name="contractorName"
          rules={[{ required: true, message: "Please enter your name!" }]}
        >
          <Input placeholder="Enter Contractor Name" />
        </Form.Item>

        <Form.Item
          label="Contractor ID"
          name="contractorId"
          rules={[{ required: true, message: "Please enter your ID!" }]}
        >
          <Input placeholder="Enter your ID" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <BackButton />
    </div>
  );
};

export default ContractorDashboard;
