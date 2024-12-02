import React, { useState, useEffect, useRef } from "react";
import { Input, Button, message } from "antd";
import {
  InboxOutlined,
  SendOutlined,
  PaperClipOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../styling/Allportal.css";

const ContractorPortal = () => {
  const { clientId } = useParams(); // Get clientId from the URL
  const [messages, setMessages] = useState([]); // Chat messages
  const [newMessage, setNewMessage] = useState(""); // Input for new message
  const [file, setFile] = useState(null); // File to send
  const messagesEndRef = useRef(null); // Scroll to bottom of the chat
  const fileInputRef = useRef(null); // Reference to file input

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/messages/${clientId}`
        );
        setMessages(response.data); // Assume API returns an array of messages
      } catch (error) {
        console.error("Error fetching messages:", error);
        message.error("Failed to load messages.");
      }
    };

    if (clientId) fetchMessages();
  }, [clientId]);

  // Scroll to the bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle file selection
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

  // Remove selected file
  const removeFile = () => {
    setFile(null);
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Send new message
  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) {
      message.warning("Please enter a message or attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append("message", newMessage);
    if (file) formData.append("file", file);
    formData.append("clientId", clientId);

    try {
      // Send message to API
      const response = await axios.post(
        `http://localhost:5000/api/messages/${clientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Add new message to the chat
      setMessages((prev) => [...prev, response.data]);

      // Simulate a mock client reply for demo purposes
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: "Thanks, Contractor! I'll review this.",
            sender: "client",
          },
        ]);
      }, 1000);

      // Clear inputs
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      message.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);
      message.error("Failed to send message.");
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Contractor Portal Chat</h2>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.sender === "contractor" ? "sent" : "received"
            }`}
          >
            <p className="chat-text">{msg.text}</p>
            {msg.file && (
              <a href={msg.file} target="_blank" rel="noopener noreferrer">
                <div className="chat-file">
                  <PaperClipOutlined />
                  <span>{msg.fileName}</span>
                  <small>
                    {msg.fileSize && `(${(msg.fileSize / 1024).toFixed(2)} KB)`}
                  </small>
                </div>
              </a>
            )}
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

export default ContractorPortal;
