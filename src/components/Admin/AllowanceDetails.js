import React from "react";
import { Table } from "react-bootstrap";

const AllowanceDetails = () => {
  // Sample data for demonstration
  const data = [
    {
      employeeId: "E001",
      role: "Manager",
      managerName: "Alice",
      allowanceType: "Food Allowance",
      accountantName: "Bob",
      date: "2024-12-01",
      description: "Lunch expenses",
      amount: 500,
      budget: 1000,
    },
    {
      employeeId: "E002",
      role: "Employee",
      managerName: "Bob",
      allowanceType: "Travel Allowance",
      accountantName: "Charlie",
      date: "2024-12-05",
      description: "Taxi fare",
      amount: 200,
      budget: 300,
    },
    // Add more data as needed
  ];

  return (
    <div className="allowance-details-container" style={{ padding: "20px" }}>
      <h2>Allowance Details</h2>

      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Role</th>
            <th>Manager Name</th>
            <th>Allowance Type</th>
            <th>Accountant Name</th>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Budget</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.employeeId}</td>
              <td>{item.role}</td>
              <td>{item.managerName}</td>
              <td>{item.allowanceType}</td>
              <td>{item.accountantName}</td>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.amount}</td>
              <td>{item.budget}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllowanceDetails;
