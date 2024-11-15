import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Typography, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom"; // To access URL params
import axios from "axios";
import BackButton from "../backbutton";
import "../../styling/Allportal.css";

const { Title } = Typography;

const ContractorPortal = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [clientData, setClientData] = useState(null);
  const [file, setFile] = useState(null);

  // Fetch client data when the component mounts or clientId changes
  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/clients/${clientId}`
        );
        setClientData(response.data);
      } catch (error) {
        console.error("Error fetching client data:", error);
        message.error("Failed to fetch client data.");
      }
    };

    if (clientId) {
      fetchClientData();
    }
  }, [clientId]);

  const onFinish = async (values) => {
    try {
      // Combine the form values and file to send to the backend
      const formData = new FormData();
      formData.append("message", values.message);
      formData.append("file", file);
      formData.append("clientId", clientId); // Attach the client ID

      // Send message with the file to the backend
      const response = await axios.post(
        `http://localhost:5000/api/messages/${clientId}`, // Assuming you have a message API endpoint
        formData
      );
      message.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message. Please try again.");
    }
  };

  const onFileChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Contractor Dashboard
      </Title>
      {clientData ? (
        <div>
          <Title level={3}>{clientData.clientName}</Title>
          <p>Project: {clientData.projectTitle}</p>
          <p>Description: {clientData.projectDescription}</p>
        </div>
      ) : (
        <p>Loading client details...</p>
      )}
      <Form
        name="contractor_portal"
        layout="vertical"
        onFinish={onFinish}
        className="contrac-portal-form"
      >
        <Form.Item
          label="Message"
          name="message"
          rules={[{ required: true, message: "Please enter your message" }]}
        >
          <Input.TextArea rows={4} placeholder="Enter your message" />
        </Form.Item>

        <Form.Item name="file" label="Upload File" valuePropName="file">
          <Upload.Dragger
            name="file"
            multiple={false}
            beforeUpload={() => false}
            onChange={onFileChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibit from
              uploading company data or any confidential information.
            </p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ContractorPortal;
