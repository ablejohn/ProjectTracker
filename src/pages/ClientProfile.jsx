import React from "react";
import { Form, Input, Button, Typography } from "antd";
import "../styling/Profile.css";
import BackButton from "../components/backbutton";

const { Title } = Typography;

const ClientProfile = () => {
  const generateProjectId = (clientName, phoneNumber) => {
    // Get first 2 letters of client name (converted to uppercase)
    const namePrefix = clientName.substring(0, 2).toUpperCase();

    // Get last 3 digits of phone number
    const numberSuffix = phoneNumber.slice(-3);

    // Combine them to create the project ID
    return `${namePrefix}${numberSuffix}`;
  };

  const onFinish = (values) => {
    const projectId = generateProjectId(values.clientName, values.phone);
    console.log("Form values:", values);
    alert(`Client registered successfully!\nProject ID: ${projectId}`);
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
          rules={[
            { required: true, message: "Please enter the client name" },
            {
              validator: (_, value) => {
                if (!value || value.length < 2) {
                  return Promise.reject(
                    "Client name must be at least 2 characters long"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input placeholder="Enter client name" />
        </Form.Item>
        <Form.Item
          label="Project Title"
          name="projectTitle"
          rules={[
            { required: true, message: "Please enter the Project Title" },
          ]}
        >
          <Input placeholder="Enter Project Title" />
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
            {
              validator: (_, value) => {
                if (!value || value.length < 3) {
                  return Promise.reject(
                    "Phone number must be at least 3 digits long"
                  );
                }
                return Promise.resolve();
              },
            },
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
