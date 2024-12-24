import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap"; // Using React-Bootstrap for form elements
import './css/AddEmployee.css'; // Assuming you have a custom CSS file for styling
import AddAllowanceType from "./AddAllowanceType";

const SetBudget = () => {
  // State to store form data
  const [allowanceType, setAllowanceType] = useState("");
  const [role, setRole] = useState("");
  const [amount, setAmount] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [allowanceTypes, setAllowanceTypes] = useState([]);
  const [roles, setRoles] = useState([]);

  // Fetch allowance types and roles from the backend
  useEffect(() => {
    const fetchAllowanceTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/allowance-types');
        const data = await response.json();
        setAllowanceTypes(data);
      } catch (error) {
        console.error('Error fetching allowance types:', error);
      }
    };

    const fetchRoles = async () => {
      try {
        const response = await fetch('http://localhost:3001/roles');
        const data = await response.json();
        console.log("aaa:",roles)
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchAllowanceTypes();
    fetchRoles();
  }, []);

  // Handle allowance type change
  const handleAllowanceTypeChange = (e) => setAllowanceType(e.target.value);

  // Handle role change
  const handleRoleChange = (e) => setRole(e.target.value);

  // Handle amount change
  const handleAmountChange = (e) => setAmount(e.target.value);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!allowanceType || !role || !amount || isNaN(amount) || amount <= 0) {
      setErrorMessage("Please fill out all fields with valid values.");
      setSuccessMessage("");
    } else {
      try {
        const response = await fetch('http://localhost:3001/add-budget', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            allowance_type_id: allowanceType,
            role_id: role,
            amount,
          }),
        });
        const result = await response.json();
        setSuccessMessage("Budget set successfully!");
        setErrorMessage("");
        console.log(result);
      } catch (error) {
        console.error('Error setting budget:', error);
        setErrorMessage("Failed to set budget.");
        setSuccessMessage("");
      }
    }
  };

  return (
    <div className="set-budget-container">
      <AddAllowanceType />
      <h2>Set Budget for Allowance</h2>

      {/* Success or Error message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Form for selecting allowance type, role, and amount */}
      <Form onSubmit={handleSubmit}>
        {/* Allowance Type Select */}
        <Form.Group controlId="allowanceType">
          <Form.Label>Allowance Type</Form.Label>
          <Form.Control
            as="select"
            value={allowanceType}
            onChange={handleAllowanceTypeChange}
          >
            <option value="">Select Allowance Type</option>
            {allowanceTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.allowance_type}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Role Select */}
        <Form.Group controlId="role">
          <Form.Label>Role</Form.Label>
          <Form.Control as="select" value={role} onChange={handleRoleChange}>
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.role_name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {/* Amount Input */}
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter the allowance amount"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button variant="primary" type="submit">
          Submit Budget
        </Button>
      </Form>
    </div>
  );
};

export default SetBudget;