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
import "../styling/ContractorList.css";

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
      <div className="contractor-list__loading">
        <Spin size="large" />
        <p>Loading contractors...</p>
      </div>
    );
  }

  return (
    <div className="contractor-list">
      <Title level={2} className="contractor-list__title">
        Registered Contractors
      </Title>

      <div className="contractor-list__search-container">
        <Input
          className="contractor-list__search-input"
          placeholder="Search contractors by name, ID, email, or phone"
          size="large"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {currentContractors.length === 0 ? (
        <p className="contractor-list__no-results">
          No contractors match your search.
        </p>
      ) : (
        <>
          <List
            className="contractor-list__list"
            bordered
            dataSource={currentContractors}
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
          <Pagination
            className="contractor-list__pagination"
            current={currentPage}
            pageSize={contractorsPerPage}
            total={filteredContractors.length}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ContractorList;
