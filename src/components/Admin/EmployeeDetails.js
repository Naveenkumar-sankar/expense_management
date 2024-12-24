import React, { useState, useEffect } from "react";

import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AddEmployee from "./AddEmployee";

const EmployeeDetails = () => {
  // State to toggle AddEmployee form
  const [isAddEmployeeVisible, setIsAddEmployeeVisible] = useState(false);

  // State to store employees
  const [employees, setEmployees] = useState([]);

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
    { field: "contact_Number", headerName: "Contact Number", flex: 1 },
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
            onClick={() => handleEdit(params.row.id)}
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
  const handleEdit = (employeeId) => {
    alert(`Edit employee with ID: ${employeeId}`);
  };

  // Handle delete action
  const handleDelete = (employeeId) => {
    if (window.confirm(`Are you sure you want to delete employee with ID: ${employeeId}?`)) {
      setEmployees((prev) => prev.filter((employee) => employee.id !== employeeId));
    }
  };

  return (
    <div style={{ height: 600, width: "100%" }}>
      {/* Header Section */}
      <div style={{ marginBottom: "16px" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => setIsAddEmployeeVisible(!isAddEmployeeVisible)}
        >
          {isAddEmployeeVisible ? "Close Form" : "Add Employee"}
        </Button>
      </div>

      {/* Render AddEmployee component conditionally */}
      {isAddEmployeeVisible && <AddEmployee />}

      {/* DataGrid Component */}
      <DataGrid
        rows={employees}
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
