import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  List,
  Typography,
  Input,
  Spin,
  message,
  Pagination,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../styling/ClientList.css";

const { Title } = Typography;

const ContractorClientList = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(7);
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
    navigate(`/client-dashboard/${clientId}`);
  };

  const filteredClients = clients.filter((client) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      client.clientName.toLowerCase().includes(lowerCaseSearch) ||
      client.projectTitle.toLowerCase().includes(lowerCaseSearch) ||
      client.email.toLowerCase().includes(lowerCaseSearch)
    );
  });

  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(
    indexOfFirstClient,
    indexOfLastClient
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="contractor-client-list__loading">
        <Spin size="large" />
        <p>Loading clients...</p>
      </div>
    );
  }

  return (
    <div className="contractor-client-list">
      <Title level={2} className="contractor-client-list__title">
        Registered Clients
      </Title>

      <div className="contractor-client-list__search-container">
        <Input
          className="contractor-client-list__search-input"
          placeholder="Search clients by name, project, or email"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentClients.length === 0 ? (
        <p className="contractor-client-list__no-results">
          No clients match your search.
        </p>
      ) : (
        <>
          <List
            className="contractor-client-list__list"
            bordered
            dataSource={currentClients}
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
          <Pagination
            className="contractor-client-list__pagination"
            current={currentPage}
            pageSize={clientsPerPage}
            total={filteredClients.length}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ContractorClientList;
