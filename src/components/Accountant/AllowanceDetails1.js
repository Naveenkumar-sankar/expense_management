import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const AllowanceDetails1 = () => {
  // Sample data for demonstration
  const data = [
    {
      employeeId: "E001",
      employeeName: "John Doe",
      allowanceType: "Food Allowance",
      amount: 500,
      date: "2024-12-01",
      description: "Lunch expenses",
      bill: "bill1.pdf",
      managerReason: "Approved for official lunch",
      managerAction: "Accepted",
      managerName: "Manager1",
      accountantReason: "",
      accountantAction: "",
      accountantName: "", // Added Accountant Name
    },
    {
      employeeId: "E002",
      employeeName: "Jane Smith",
      allowanceType: "Travel Allowance",
      amount: 300,
      date: "2024-12-05",
      description: "Taxi fare",
      bill: "bill2.pdf",
      managerReason: "Approved for client visit",
      managerAction: "Accepted",
      managerName: "Manager2",
      accountantReason: "",
      accountantAction: "",
      accountantName: "", // Added Accountant Name
    },
    // Add more data as needed
  ];

  const [filteredData, setFilteredData] = useState(data);

  // Handle accountant actions
  const handleAccountantAction = (index, action, reason, name) => {
    const updatedData = [...filteredData];
    updatedData[index].accountantAction = action;
    updatedData[index].accountantReason = reason;
    updatedData[index].accountantName = name; // Update accountant's name
    setFilteredData(updatedData);
  };

  return (
    <div className="allowance-details-container" style={{ padding: "20px" }}>
      <h2>Allowance Details</h2>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Allowance Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Description</th>
            <th>Bill</th>
            <th>Manager Reason</th>
            <th>Manager Action</th>
            <th>Manager Name</th>
            <th>Accountant Reason</th>
            <th>Accountant Action</th>
            <th>Accountant Name</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.employeeId}</td>
              <td>{item.employeeName}</td>
              <td>{item.allowanceType}</td>
              <td>{item.amount}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>
                <a href={`/${item.bill}`} download>
                  Download
                </a>
              </td>
              <td>{item.managerReason}</td>
              <td>
                {/* Display Manager Action with icons */}
                <div>
                  {item.managerAction === "Accepted" ? (
                    <FaCheckCircle color="green" />
                  ) : item.managerAction === "Rejected" ? (
                    <FaTimesCircle color="red" />
                  ) : (
                    "Pending"
                  )}
                </div>
              </td>
              <td>{item.managerName}</td>
              <td>
                <Form.Control
                  type="text"
                  placeholder="Enter Reason"
                  value={item.accountantReason}
                  onChange={(e) =>
                    handleAccountantAction(index, item.accountantAction, e.target.value, item.accountantName)
                  }
                />
              </td>
              <td>
                {/* Accountant Action with icons */}
                {item.accountantAction === "Accepted" ? (
                  <FaCheckCircle color="green" />
                ) : item.accountantAction === "Rejected" ? (
                  <FaTimesCircle color="red" />
                ) : (
                  <div>
                    <Button
                      variant="success"
                      onClick={() =>
                        handleAccountantAction(index, "Accepted", item.accountantReason, "Accountant1")
                      }
                      style={{ marginRight: "5px" }}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() =>
                        handleAccountantAction(index, "Rejected", item.accountantReason, "Accountant1")
                      }
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </td>
              <td>{item.accountantName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowanceDetails1;
