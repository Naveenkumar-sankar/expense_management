import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap"; // Using React-Bootstrap for form elements
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
  const [budgets, setBudgets] = useState([]);
  const [editingBudget, setEditingBudget] = useState(null);
  const [isAddAllowanceTypeVisible, setIsAddAllowanceTypeVisible] = useState(false);

  // Fetch allowance types, roles, and budgets from the backend
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
        setRoles(data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    const fetchBudgets = async () => {
      try {
        const response = await fetch('http://localhost:3001/budgets');
        const data = await response.json();
        setBudgets(data);
      } catch (error) {
        console.error('Error fetching budgets:', error);
      }
    };

    fetchAllowanceTypes();
    fetchRoles();
    fetchBudgets();
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
        setBudgets([...budgets, result]);
        setAllowanceType("");
        setRole("");
        setAmount("");
      } catch (error) {
        console.error('Error setting budget:', error);
        setErrorMessage("Failed to set budget.");
        setSuccessMessage("");
      }
    }
  };

  // Handle edit budget
  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setAllowanceType(budget.allowance_type_id);
    setRole(budget.role_id);
    setAmount(budget.amount);
  };

  // Handle update budget
  const handleUpdateBudget = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/update-budget/${editingBudget.id}`, {
        method: 'PUT',
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
      setBudgets(budgets.map((budget) => (budget.id === result.id ? result : budget)));
      setSuccessMessage("Budget updated successfully!");
      setErrorMessage("");
      setEditingBudget(null);
      setAllowanceType("");
      setRole("");
      setAmount("");
    } catch (error) {
      console.error('Error updating budget:', error);
      setErrorMessage("Failed to update budget.");
      setSuccessMessage("");
    }
  };

  // Handle delete budget
  const handleDeleteBudget = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-budget/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBudgets(budgets.filter((budget) => budget.id !== id));
        setSuccessMessage("Budget deleted successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage("Failed to delete budget.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      setErrorMessage("Failed to delete budget.");
      setSuccessMessage("");
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "allowance_type", headerName: "Allowance Type", flex: 1 }, // Display allowance type name
    { field: "role_name", headerName: "Role", flex: 1 }, // Display role name
    { field: "amount", headerName: "Amount", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditBudget(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteBudget(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="set-budget-container">
      <Button
        className="button button-blue"
        onClick={() => setIsAddAllowanceTypeVisible(!isAddAllowanceTypeVisible)}
      >
        {isAddAllowanceTypeVisible ? "Close Add Allowance Type" : "Add Allowance Type"}
      </Button>

      {isAddAllowanceTypeVisible && <AddAllowanceType />}

      

      {/* Success or Error message */}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      {/* Form for selecting allowance type, role, and amount */}
      <Form onSubmit={editingBudget ? handleUpdateBudget : handleSubmit} className="form-container">
        {/* Allowance Type Select */}
        <h2>Set Budget for Allowance</h2>
        <Form.Group controlId="allowanceType" className="form-group">
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
        <Form.Group controlId="role" className="form-group">
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
        <Form.Group controlId="amount" className="form-group">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter the allowance amount"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button className="button button-green" type="submit">
          {editingBudget ? "Update Budget" : "Submit Budget"}
        </Button>
      </Form>

      {/* DataGrid Component */}
      <div style={{ height: 400, width: "100%", marginTop: 20 }}>
        <DataGrid rows={budgets} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default SetBudget;