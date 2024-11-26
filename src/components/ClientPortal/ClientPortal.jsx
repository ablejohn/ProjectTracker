import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Upload, Typography, Card } from "antd";
import { InboxOutlined, SendOutlined } from "@ant-design/icons";
import "../../styling/Allportal.css";

const { Title, Text } = Typography;

const ClientPortal = () => {
  const [messages, setMessages] = useState([]); // All chat messages
  const [newMessage, setNewMessage] = useState(""); // Input for new message
  const [file, setFile] = useState(null); // File to send
  const messagesEndRef = useRef(null); // To scroll to the bottom of the chat

  // Mock fetch messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      // Simulate fetching messages
      setTimeout(() => {
        setMessages([
          { content: "Hello, Contractor!", sender: "Client" },
          { content: "Hi, Client! How can I help?", sender: "Contractor" },
        ]);
      }, 500);
    };
    fetchMessages();
  }, []);

  // Scroll to the bottom of the chat when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle file selection
  const onFileChange = (info) => {
    if (info.file.status === "uploading") return;
    if (info.file.status === "done") {
      setFile(info.file.originFileObj);
    }
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() && !file) {
      alert("Please enter a message or attach a file!");
      return;
    }

    const newMsg = {
      content: newMessage,
      file: file ? { name: file.name } : null,
      sender: "Client",
    };

    // Simulate sending to the backend and receiving contractor's response
    setMessages((prev) => [...prev, newMsg]);

    // Simulated contractor reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: "Got it! Thanks for the update.",
          sender: "Contractor",
        },
      ]);
    }, 1000);

    // Clear input and file
    setNewMessage("");
    setFile(null);
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
              <a href="#" className="chat-file">
                📎 {msg.file.name}
              </a>
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
        <Upload
          name="file"
          beforeUpload={() => false}
          onChange={onFileChange}
          showUploadList={false}
        >
          <Button icon={<InboxOutlined />} />
        </Upload>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
        />
      </div>
    </div>
  );
};

export default ClientPortal;
