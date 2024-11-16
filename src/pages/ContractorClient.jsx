// ContractorClientList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, List, Typography, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ContractorClientList = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        message.error("Failed to load clients list");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (clientId) => {
    navigate(`/contractor-dashboard/${clientId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>All Registered Clients</Title>
      {clients.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          No clients registered yet.
        </div>
      ) : (
        <List
          bordered
          dataSource={clients}
          renderItem={(client) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleClientSelect(client.id)}
                >
                  View Messages
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={`${client.clientName} (ID: ${client.projectId})`}
                description={
                  <div>
                    <p>Project: {client.projectTitle}</p>
                    <p>Email: {client.email}</p>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default ContractorClientList;
