import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Upload, Typography, Card, message } from "antd";
import {
  InboxOutlined,
  SendOutlined,
  PaperClipOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../../styling/Allportal.css";

const { Title, Text } = Typography;

const ClientPortal = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      setTimeout(() => {
        setMessages([
          { content: "Hello, how can I help you today?", sender: "Contractor" },
          {
            content: "I need to discuss my project details.",
            sender: "Client",
          },
        ]);
      }, 500);
    };
    fetchMessages();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file size (e.g., max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        message.error("File must be smaller than 5MB");
        return;
      }

      // Optional: Validate file types
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        message.error("Unsupported file type");
        return;
      }

      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() && !file) {
      return;
    }

    const newMsg = {
      content: newMessage,
      file: file
        ? {
            name: file.name,
            type: file.type,
            size: file.size,
          }
        : null,
      sender: "Client",
    };

    setMessages((prev) => [...prev, newMsg]);

    // Here you would typically send the message and file to your backend
    // For example:
    // const formData = new FormData();
    // formData.append('message', newMessage);
    // formData.append('file', file);
    // axios.post('/api/send-message', formData);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "I'll review your message and get back to you soon.",
          sender: "Contractor",
        },
      ]);
    }, 1000);

    setNewMessage("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Client Portal Chat</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "Client" ? "sent" : "received"
            }`}
          >
            <p className="chat-text">{msg.content}</p>
            {msg.file && (
              <div className="chat-file-info">
                <PaperClipOutlined />
                <span>{msg.file.name}</span>
                <small>
                  ({(msg.file.size / 1024).toFixed(2)} KB, {msg.file.type})
                </small>
              </div>
            )}
            <small>{msg.sender}</small>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <Input.TextArea
          rows={1}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <div className="file-upload-container">
          <input
            type="file"
            ref={fileInputRef}
            onChange={onFileChange}
            style={{ display: "none" }}
            accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
          />
          <Button
            icon={<InboxOutlined />}
            onClick={() => fileInputRef.current.click()}
          >
            Attach File
          </Button>
          {file && (
            <div className="file-preview">
              <span>{file.name}</span>
              <CloseCircleOutlined
                onClick={removeFile}
                style={{ color: "red", marginLeft: "8px", cursor: "pointer" }}
              />
            </div>
          )}
        </div>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          disabled={!newMessage.trim() && !file}
        />
      </div>
    </div>
  );
};

export default ClientPortal;
