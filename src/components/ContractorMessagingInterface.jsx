import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Input,
  Button,
  List,
  Typography,
  message,
  Avatar,
  Spin,
} from "antd";
import {
  MenuOutlined,
  SendOutlined,
  PaperClipOutlined,
  CloseCircleOutlined,
  SearchOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import "../styling/MessengerLayout.css";

const { Sider, Content } = Layout;
const { Title, Text } = Typography;

const ContractorMessagingInterface = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [file, setFile] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/clients" // Update this endpoint
        );
        setClients(response.data);
        setFilteredClients(response.data);
      } catch (error) {
        message.error("Failed to load clients");
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedClient) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/messages/${selectedClient.id}`
          );
          setMessages(response.data);
        } catch (error) {
          message.error("Failed to load messages");
        }
      }
    };
    fetchMessages();
  }, [selectedClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSearchClients = (value) => {
    const filtered = clients.filter((client) =>
      client.clientName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredClients(filtered);
    setSearchTerm(value);
  };

  const handleSelectClient = (client) => {
    setSelectedClient(client);
    setIsMobileSidebarOpen(false);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !file) {
      message.warning("Please enter a message or attach a file.");
      return;
    }

    const formData = new FormData();
    formData.append("message", newMessage);
    if (file) formData.append("file", file);
    formData.append("contractorId", selectedClient.id);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/messages/${selectedClient.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      message.success("Message sent successfully!");
    } catch (error) {
      message.error("Failed to send message");
    }
  };

  const handleFileUpload = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile.size > 5 * 1024 * 1024) {
      message.error("File must be smaller than 5MB");
      return;
    }
    setFile(selectedFile);
  };

  return (
    <Layout className="messenger-layout">
      {isMobileSidebarOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      <Sider
        className={`messenger-sidebar ${isMobileSidebarOpen ? "active" : ""}`}
        width={300}
      >
        <div className="sidebar-header">
          <Title level={4}>Clients</Title>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search for your Client"
            value={searchTerm}
            onChange={(e) => handleSearchClients(e.target.value)}
          />
        </div>
        <List
          className="client-list"
          dataSource={filteredClients}
          renderItem={(client) => (
            <List.Item
              className={`client-item ${
                selectedClient?.id === client.id ? "selected" : ""
              }`}
              onClick={() => handleSelectClient(client)}
            >
              <Avatar style={{ backgroundColor: "#1890ff" }}>
                {client.clientName[0]}
              </Avatar>
              <List.Item.Meta
                title={client.clientName}
                description={`ID: ${client.clientId}`}
              />
            </List.Item>
          )}
        />
      </Sider>

      <Content className="messenger-content">
        <div className="chat-header">
          <Button
            icon={<MenuOutlined />}
            onClick={() => setIsMobileSidebarOpen(true)}
            className="mobile-sidebar-toggle"
          />
          <Title level={4}>
            {selectedClient ? selectedClient.clientName : "Messages"}
          </Title>
        </div>

        <div className="chat-messages">
          {selectedClient ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "me" ? "sent" : "received"
                }`}
              >
                <Text>{msg.text}</Text>
              </div>
            ))
          ) : (
            <div className="no-chat-selected">
              <Title level={3}>Select a Client to Start Messaging</Title>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {selectedClient && (
          <div className="chat-input">
            <Input.TextArea
              rows={2}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <div className="input-actions">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx"
              />
              <Button
                icon={<InboxOutlined />}
                onClick={() => fileInputRef.current.click()}
              >
                Attach
              </Button>
              {file && (
                <div className="file-preview">
                  <Text>{file.name}</Text>
                  <CloseCircleOutlined
                    onClick={() => setFile(null)}
                    style={{ color: "red", marginLeft: "8px" }}
                  />
                </div>
              )}
              <Button
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!newMessage.trim() && !file}
              >
                Send
              </Button>
            </div>
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default ContractorMessagingInterface;
