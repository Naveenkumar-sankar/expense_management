import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaClipboardList, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AllowanceDetails2 = () => {
  // Sample data for demonstration
  const data = [
    {
      employeeId: "E001",
      employeeName: "John Doe",
      role: "Employee",
      allowanceType: "Food Allowance",
      description: "Lunch expenses",
      amount: 500,
      bill: "bill1.pdf",
      managerReason: "",
      managerAction: "",
      managerName: "",
    },
    {
      employeeId: "E002",
      employeeName: "Jane Smith",
      role: "Manager",
      allowanceType: "Travel Allowance",
      description: "Taxi fare",
      amount: 300,
      bill: "bill2.pdf",
      managerReason: "",
      managerAction: "",
      managerName: "",
    },
  ];

  const [employeeIdFilter, setEmployeeIdFilter] = useState("");
  const [fromDateFilter, setFromDateFilter] = useState("");
  const [toDateFilter, setToDateFilter] = useState("");
  const [allowanceTypeFilter, setAllowanceTypeFilter] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  // Handle filter changes
  const handleFilterChange = () => {
    let filtered = data;

    if (employeeIdFilter) {
      filtered = filtered.filter((item) =>
        item.employeeId.toLowerCase().includes(employeeIdFilter.toLowerCase())
      );
    }
    if (fromDateFilter) {
      filtered = filtered.filter((item) => item.date >= fromDateFilter);
    }
    if (toDateFilter) {
      filtered = filtered.filter((item) => item.date <= toDateFilter);
    }
    if (allowanceTypeFilter) {
      filtered = filtered.filter((item) =>
        item.allowanceType.toLowerCase().includes(allowanceTypeFilter.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  // Handle manager actions
  const handleManagerAction = (index, action, reason, name) => {
    const updatedData = [...filteredData];
    updatedData[index].managerAction = action;
    updatedData[index].managerReason = reason;
    updatedData[index].managerName = name;
    setFilteredData(updatedData);
  };

  return (
    <div className="allowance-details-container" style={{ padding: "20px" }}>
      <h2>Allowance Details</h2>

      {/* Filters */}
      <div className="filters" style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
        <Form.Group controlId="employeeIdFilter" style={{ flex: "1" }}>
          <Form.Label>
            <FaUser /> Employee ID
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Employee ID"
            value={employeeIdFilter}
            onChange={(e) => setEmployeeIdFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="fromDateFilter" style={{ flex: "1" }}>
          <Form.Label>
            <FaCalendarAlt /> From Date
          </Form.Label>
          <Form.Control
            type="date"
            value={fromDateFilter}
            onChange={(e) => setFromDateFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="toDateFilter" style={{ flex: "1" }}>
          <Form.Label>
            <FaCalendarAlt /> To Date
          </Form.Label>
          <Form.Control
            type="date"
            value={toDateFilter}
            onChange={(e) => setToDateFilter(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="allowanceTypeFilter" style={{ flex: "1" }}>
          <Form.Label>
            <FaClipboardList /> Allowance Type
          </Form.Label>
          <Form.Control
            as="select"
            value={allowanceTypeFilter}
            onChange={(e) => setAllowanceTypeFilter(e.target.value)}
          >
            <option value="">Select Allowance Type</option>
            <option value="Food Allowance">Food Allowance</option>
            <option value="Travel Allowance">Travel Allowance</option>
          </Form.Control>
        </Form.Group>
        <div style={{ alignSelf: "flex-end", marginTop: "10px" }}>
          <Button variant="primary" onClick={handleFilterChange}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Role</th>
            <th>Allowance Type</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Bill</th>
            <th>Manager Reason</th>
            <th>Manager Action</th>
            <th>Manager Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.employeeId}</td>
              <td>{item.employeeName}</td>
              <td>{item.role}</td>
              <td>{item.allowanceType}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>
                <a href={`/${item.bill}`} download>
                  Download
                </a>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter Reason"
                  value={item.managerReason}
                  onChange={(e) =>
                    handleManagerAction(index, item.managerAction, e.target.value, item.managerName)
                  }
                />
              </td>
              <td>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                  <FaCheckCircle
                    color="green"
                    style={{
                      cursor: item.managerAction ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      !item.managerAction &&
                      handleManagerAction(index, "Accepted", item.managerReason, "Manager1")
                    }
                  />
                  <FaTimesCircle
                    color="red"
                    style={{
                      cursor: item.managerAction ? "not-allowed" : "pointer",
                    }}
                    onClick={() =>
                      !item.managerAction &&
                      handleManagerAction(index, "Rejected", item.managerReason, "Manager1")
                    }
                  />
                  <Form.Control
                    as="select"
                    value={item.managerAction}
                    onChange={(e) =>
                      !item.managerAction &&
                      handleManagerAction(index, e.target.value, item.managerReason, "Manager1")
                    }
                    disabled={item.managerAction}
                  >
                    <option value="">Select Action</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Rejected">Rejected</option>
                  </Form.Control>
                </div>
              </td>
              <td>{item.managerName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowanceDetails2;
