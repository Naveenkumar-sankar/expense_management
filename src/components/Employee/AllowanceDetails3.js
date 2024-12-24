import React, { useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

const AllowanceDetails3 = () => {
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
      accountantReason: "Verified expenses",
      accountantAction: "Accepted",
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
      accountantReason: "Awaiting review",
      accountantAction: "Pending",
    },
    // Add more data as needed
  ];

  const [filteredData, setFilteredData] = useState(data);

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
            <th>Accountant Reason</th>
            <th>Accountant Action</th>
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
              <td>{item.managerAction}</td>
              <td>{item.accountantReason}</td>
              <td>{item.accountantAction}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowanceDetails3;
