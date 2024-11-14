import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/AllLogin.css";
import BackButton from "../Components/backbutton";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ContractorDashboard = () => {
  const navigate = useNavigate();

  const handleContractorPortal = () => {
    alert("Login successful...");
    navigate("/contractor-dashboard");
  };

  const onFinish = (values) => {
    console.log("Form values:", values);

    handleContractorPortal(); // Navigate to contractor profile on form submission
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
        name="clientForm"
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

        <Form.Item
          label="Project ID"
          name="projectId"
          rules={[{ required: true, message: "Please enter the Project ID!" }]}
        >
          <Input placeholder="Enter the Project ID" />
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
