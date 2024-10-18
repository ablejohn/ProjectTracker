import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/AllLogin.css"; // Optional: Add custom CSS

const { Title } = Typography;

const ClientDashboard = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Form submitted successfully!");
  };

  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">
        Client Dashboard
      </Title>
      <p>Welcome to your project dashboard. Here you'll see project updates.</p>

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
  );
};

export default ClientDashboard;
