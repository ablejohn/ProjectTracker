// src/pages/ContractorClientList.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, List, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ContractorClientList = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch clients from the backend
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data); // Assuming the data is an array of clients
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (clientId) => {
    // Redirect to the Contractor Dashboard with the selected client
    navigate(`/contractor-dashboard/${clientId}`);
  };

  return (
    <div className="client-list-container">
      <Title level={2}>All Registered Clients</Title>
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
              title={client.clientName}
              description={client.projectTitle}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default ContractorClientList;
