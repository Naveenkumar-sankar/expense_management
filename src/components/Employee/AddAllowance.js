import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";

const AddAllowance = () => {
  const [formData, setFormData] = useState({
    employeeId: "",
    allowanceType: "",
    amount: "",
    description: "",
    date: "",
    bill: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      bill: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here, e.g., send data to the backend
    console.log("Submitted Data:", formData);
    alert("Allowance details submitted successfully!");
  };

  return (
    <div className="add-allowance-container" style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Add Allowance</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="employeeId" className="mb-3">
          <Form.Label>Employee ID</Form.Label>
          <Form.Control
            type="text"
            name="employeeId"
            placeholder="Enter Employee ID"
            value={formData.employeeId}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="allowanceType" className="mb-3">
          <Form.Label>Allowance Type</Form.Label>
          <Form.Control
            as="select"
            name="allowanceType"
            value={formData.allowanceType}
            onChange={handleChange}
            required
          >
            <option value="">Select Allowance Type</option>
            <option value="Food Allowance">Food Allowance</option>
            <option value="Travel Allowance">Travel Allowance</option>
            <option value="Medical Allowance">Medical Allowance</option>
            <option value="Other">Other</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="amount" className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter Amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            rows={3}
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="date" className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="bill" className="mb-3">
          <Form.Label>Upload Bill</Form.Label>
          <Form.Control
            type="file"
            name="bill"
            onChange={handleFileChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddAllowance;
