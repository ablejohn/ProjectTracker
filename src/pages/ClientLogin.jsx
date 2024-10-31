import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/AllLogin.css"; // Optional: Add custom CSS
import BackButton from "../components/backbutton";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

const ClientDashboard = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Login successful...");
    navigate("/client-dashboard");
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
              { required: true, message: "Please enter the project title!" },
            ]}
          >
            <Input placeholder="Enter Project Title" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
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
