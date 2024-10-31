import React, { useState } from "react";
import { Form, Input, Button, Upload, Typography, Card, Space } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import BackButton from "../backbutton";
import "../../styling/Allportal.css";

const { Title, Text } = Typography;

const ClientPortal = () => {
  const [file, setFile] = useState(null);
  const [messages, setMessages] = useState([]);
  const [form] = Form.useForm(); // Add form instance to reset fields

  const onFinish = (values) => {
    const newMessage = {
      content: values.message,
      file: file,
      sender: "Client",
    };
    setMessages([...messages, newMessage]);
    setFile(null);
    form.resetFields(); // Clear form fields
    console.log("Form values:", values);
    console.log("Uploaded file:", file);
    alert("Message sent successfully!");
  };

  const onFileChange = (info) => {
    if (info.file.status === "uploading") {
      return;
    }
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  // Function to receive messages from the contractor
  const receiveContractorMessage = (message) => {
    const newMessage = {
      content: message.content,
      file: message.file,
      sender: "Contractor",
    };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Client Portal
      </Title>

      <Form
        form={form} // Bind form instance
        name="client_portal"
        layout="vertical"
        onFinish={onFinish}
        className="client-portal-form"
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
            <p className="ant-upload-hint">Support for a single file upload.</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="submit-button">
            Send
          </Button>
        </Form.Item>
      </Form>

      <div className="message-container">
        <Title level={3}>Messages</Title>
        {messages.length > 0 ? (
          <Space direction="vertical" style={{ width: "100%" }}>
            {messages.map((message, index) => (
              <Card
                key={index}
                className={`message-card ${
                  message.sender === "Client"
                    ? "client-message"
                    : "contractor-message"
                }`}
              >
                <Text>{message.content}</Text>
                {message.file && (
                  <div>
                    <Text>Attached file: </Text>
                    <a href="#">{message.file.name}</a>
                  </div>
                )}
                <Text className="message-sender">{message.sender}</Text>
              </Card>
            ))}
          </Space>
        ) : (
          <Text>No messages yet.</Text>
        )}
      </div>
    </div>
  );
};

// Function to send a contractor message
export const sendContractorMessage = (message) => {
  // You may pass this function as a prop to ClientPortal in the parent component
  // Or, adjust the design if ClientPortal is supposed to handle this logic.
};

export default ClientPortal;
