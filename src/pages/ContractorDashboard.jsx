// src/pages/ContractorDashboard.jsx
import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "../styling/ContractorDashboard.css"; // Make sure to create this CSS file

const ContractorDashboard = () => {
  const [form] = Form.useForm();
  const [contractorId, setContractorId] = useState("");

  const handleFinish = (values) => {
    console.log("Received values:", values);
    // Here, you can handle form submission, e.g., sending data to an API
  };

  return (
    <div className="contractor-dashboard">
      <h1>Contractor Dashboard</h1>
      <p>Here you'll manage your clients and upload project updates.</p>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="contractor-form"
      >
        <Form.Item
          label="Contractor Name"
          name="contractorName"
          rules={[
            { required: true, message: "Please input your contractor name!" },
          ]}
        >
          <Input placeholder="Enter Contractor Name" />
        </Form.Item>

        <Form.Item
          label="Contractor ID"
          name="contractorId"
          rules={[
            { required: true, message: "Please input your contractor ID!" },
          ]}
        >
          <Input
            placeholder="Enter Contractor ID"
            value={contractorId}
            onChange={(e) => setContractorId(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContractorDashboard;
