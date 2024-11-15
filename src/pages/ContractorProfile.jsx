import React, { useState, useEffect } from "react";
import { List, Button, Typography, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For navigation
import "../styling/Profile.css"; // Optional: Add custom CSS
import BackButton from "../Components/backbutton"; // Assuming BackButton is a custom component

const { Title } = Typography;

const ContractorProfile = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of clients for this contractor (if applicable)
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/clients");
        setClients(response.data); // Assuming this returns a list of all clients
      } catch (error) {
        console.error("Error fetching clients:", error);
        message.error("Failed to load clients.");
      }
    };

    fetchClients();
  }, []);

  const handleClientSelect = (clientId) => {
    // Navigate to the contractor's messaging page for the selected client
    navigate(`/contractor-dashboard/${clientId}`);
  };

  return (
    <div className="form-container">
      <BackButton />
      <Title level={2} className="form-title">
        Contractor Profile
      </Title>

      <div className="client-list">
        <Title level={3}>Clients</Title>
        <List
          itemLayout="horizontal"
          dataSource={clients}
          renderItem={(client) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  onClick={() => handleClientSelect(client.id)} // Assuming each client has an `id`
                >
                  View Messages
                </Button>,
              ]}
            >
              <List.Item.Meta
                title={client.clientName}
                description={`Project: ${client.projectTitle}`}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default ContractorProfile;
