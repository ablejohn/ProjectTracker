import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/AllLogin.css";
import BackButton from "../components/backbutton";

const { Title } = Typography;

const ClientDashboard = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    alert("Form submitted successfully!");
  };

  return (
    <div className="dashboard-container">
      <Title level={2} className="dashboard-title">
        Contractor Login
      </Title>
      <p>Here you'll manage your clients and upload project updates.</p>

      <Form
        name="clientForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: 400, margin: "20px auto" }}
      >
        <Form.Item
          label="ContractorName"
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
          <Input placeholder="Enter your ID " />
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

export default ClientDashboard;
