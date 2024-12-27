import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEmployee from "./AddEmployee";
import AddRole from "./AddRole";

const EmployeeDetails = () => {
  // State to toggle AddEmployee form
  const [isAddEmployeeVisible, setIsAddEmployeeVisible] = useState(false);

  // State to toggle AddRole form
  const [isAddRoleVisible, setIsAddRoleVisible] = useState(false);

  // State to store employees
  const [employees, setEmployees] = useState([]);

  // State to store the employee being edited
  const [editingEmployee, setEditingEmployee] = useState(null);

  // State to store filter values
  const [roleFilter, setRoleFilter] = useState("");
  const [managerFilter, setManagerFilter] = useState("");

  // Fetch employees from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:3001/employees");
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Employee ID", flex: 1 },
    { field: "name", headerName: "Employee Name", flex: 1 },
    { field: "email", headerName: "Email ID", flex: 1 },
    { field: "contact_number", headerName: "Contact Number", flex: 1 },
    { field: "role", headerName: "Role", flex: 1 },
    { field: "manager_name", headerName: "Manager Name", flex: 1 },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      flex: 1,
      renderCell: (params) => (
        <img
          src={`http://localhost:3001${params.value}`}
          alt="Profile"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "default-image-path";
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <div>
          <Button
            variant="text"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </div>
      ),
      sortable: false,
      filterable: false,
    },
  ];

  // Handle edit action
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setIsAddEmployeeVisible(true);
  };

  // Handle delete action
  const handleDelete = async (employeeId) => {
    if (window.confirm(`Are you sure you want to delete employee with ID: ${employeeId}?`)) {
      try {
        const response = await fetch(`http://localhost:3001/delete-employee/${employeeId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setEmployees((prev) => prev.filter((employee) => employee.id !== employeeId));
        } else {
          console.error('Failed to delete employee');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  // Filter employees based on role and manager name
  const filteredEmployees = employees.filter((employee) => {
    return (
      (roleFilter === "" || employee.role === roleFilter) &&
      (managerFilter === "" || employee.manager_name === managerFilter)
    );
  });

  return (
    <div style={{ height: 600, width: "100%" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "16px", display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => {
              setIsAddEmployeeVisible(!isAddEmployeeVisible);
              setEditingEmployee(null); // Reset editing employee when adding a new one
            }}
          >
            {isAddEmployeeVisible ? "Close Form" : "Add Employee"}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={() => setIsAddRoleVisible(!isAddRoleVisible)}
            style={{ marginLeft: "10px" }}
          >
            {isAddRoleVisible ? "Close Form" : "Add Role"}
          </Button>
        </div>
        
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              label="Role"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="Accountant">Accountant</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Manager</InputLabel>
            <Select
              value={managerFilter}
              onChange={(e) => setManagerFilter(e.target.value)}
              label="Manager"
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {employees
                .filter((employee) => employee.role === "Manager")
                .map((manager) => (
                  <MenuItem key={manager.id} value={manager.name}>
                    {manager.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Render AddEmployee component conditionally */}
      {isAddEmployeeVisible && (
        <AddEmployee
          employee={editingEmployee}
          onClose={() => setIsAddEmployeeVisible(false)}
          onSave={(updatedEmployee) => {
            setEmployees((prev) =>
              prev.map((emp) => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
            );
            setIsAddEmployeeVisible(false);
          }}
        />
      )}

      {/* Render AddRole component conditionally */}
      {isAddRoleVisible && (
        <AddRole
          onClose={() => setIsAddRoleVisible(false)}
        />
      )}

      {/* DataGrid Component */}
      <DataGrid
        rows={filteredEmployees}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          Toolbar: GridToolbar, // Add toolbar with filters, density controls, and more
        }}
        density="comfortable" // Default density
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
};

export default EmployeeDetails;