import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/Profile.css"; // Optional: Add custom CSS
import BackButton from "../components/backbutton";

const { Title } = Typography;

const ContractorProfile = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Contractor registered successfully!");
  };

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Contractor Registration
      </Title>
      <Form
        name="contractor_registration"
        layout="vertical"
        onFinish={onFinish}
        className="registration-form"
      >
        <Form.Item
          label="Contractor Name"
          name="contractorName"
          rules={[
            { required: true, message: "Please enter the contractor's name" },
          ]}
        >
          <Input placeholder="Enter contractor name" />
        </Form.Item>

        <Form.Item
          label="Contractor ID"
          name="contractorId"
          rules={[
            { required: true, message: "Please enter a valid contractor ID" },
          ]}
        >
          <Input placeholder="Enter contractor ID" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter an email address" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phone"
          rules={[{ required: true, message: "Please enter a phone number" }]}
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

export default ContractorProfile;
