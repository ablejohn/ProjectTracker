import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, List, Typography, Input, Spin, message } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ContractorClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredClients = clients.filter((client) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      client.clientName.toLowerCase().includes(lowerCaseSearch) ||
      client.projectTitle.toLowerCase().includes(lowerCaseSearch) ||
      client.email.toLowerCase().includes(lowerCaseSearch)
    );
  });

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <p>Loading clients...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Registered Clients
      </Title>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Input
          placeholder="Search clients by name, project, or email"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "500px", width: "100%" }}
        />
      </div>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No clients match your search.
        </p>
      ) : (
        <List
          bordered
          dataSource={filteredClients}
          style={{ maxWidth: "800px", margin: "0 auto" }}
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
                title={`Client: ${client.clientName}`}
                description={
                  <>
                    <p>Project: {client.projectTitle}</p>
                    <p>Email: {client.email}</p>
                  </>
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
