import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/Profile.css";
import BackButton from "../components/backbutton";

const { Title } = Typography;

const ClientProfile = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Client registered successfully!");
  };

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Client Registration
      </Title>
      <Form
        name="client_registration"
        layout="vertical"
        onFinish={onFinish}
        className="registration-form"
      >
        <Form.Item
          label="Client Name"
          name="clientName"
          rules={[{ required: true, message: "Please enter the client name" }]}
        >
          <Input placeholder="Enter client name" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
          ]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ClientProfile;
