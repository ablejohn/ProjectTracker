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

const { Title } = Typography;

const ContractorList = () => {
  const [contractors, setContractors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [contractorsPerPage] = useState(7);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/contractors"
        );
        console.log("Contractors fetched:", response.data);
        setContractors(response.data);
      } catch (error) {
        console.error("Error fetching contractors:", error);
        message.error("Failed to load contractors list");
      } finally {
        setLoading(false);
      }
    };

    fetchContractors();
  }, []);

  const handleContractorSelect = (contractorId) => {
    navigate(`/contractor-dashboard/${contractorId}`);
  };

  const filteredContractors = contractors.filter((contractor) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    return (
      contractor.contractorName.toLowerCase().includes(lowerCaseSearch) ||
      contractor.contractorId.toLowerCase().includes(lowerCaseSearch) ||
      contractor.email.toLowerCase().includes(lowerCaseSearch) ||
      contractor.phone.toLowerCase().includes(lowerCaseSearch)
    );
  });

  // Pagination Logic
  const indexOfLastContractor = currentPage * contractorsPerPage;
  const indexOfFirstContractor = indexOfLastContractor - contractorsPerPage;
  const currentContractors = filteredContractors.slice(
    indexOfFirstContractor,
    indexOfLastContractor
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin size="large" />
        <p>Loading contractors...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Registered Contractors
      </Title>

      {/* Search Input */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Input
          placeholder="Search contractors by name, ID, email, or phone"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "500px", width: "100%" }}
        />
      </div>

      {/* Contractors List */}
      {currentContractors.length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No contractors match your search.
        </p>
      ) : (
        <>
          <List
            bordered
            dataSource={currentContractors}
            style={{ maxWidth: "800px", margin: "0 auto" }}
            renderItem={(contractor) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleContractorSelect(contractor.id)}
                  >
                    View Details
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`Contractor: ${contractor.contractorName}`}
                  description={
                    <>
                      <p>Contractor ID: {contractor.contractorId}</p>
                      <p>Email: {contractor.email}</p>
                      <p>Phone: {contractor.phone}</p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          {/* Pagination Component */}
          <Pagination
            current={currentPage}
            pageSize={contractorsPerPage}
            total={filteredContractors.length}
            onChange={handlePageChange}
            style={{ textAlign: "center", marginTop: "20px" }}
          />
        </>
      )}
    </div>
  );
};

export default ContractorList;
