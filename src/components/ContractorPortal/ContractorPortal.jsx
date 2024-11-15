import React, { useState } from "react";
import { Form, Input, Button, Upload, Typography } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import BackButton from "../backbutton";
import "../../styling/Allportal.css";

const { Title } = Typography;

const ContractorPortal = () => {
  const [file, setFile] = useState(null);

  const onFinish = (values) => {
    console.log("Form values:", values);
    console.log("Uploaded file:", file);
    // Add your logic to handle form submission and file upload here
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

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Contractor Dashboard
      </Title>
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