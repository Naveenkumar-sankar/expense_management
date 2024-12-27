import React, { useState, useEffect } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";

const AddRole = () => {
  const [roles, setRoles] = useState([]);
  const [open, setOpen] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [editingRole, setEditingRole] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch("http://localhost:3001/roles");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const handleAddRole = async () => {
    try {
      const response = await fetch("http://localhost:3001/add-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role_name: roleName }),
      });
      if (response.ok) {
        fetchRoles();
        setRoleName("");
        setOpen(false);
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  const handleEditRole = async () => {
    try {
      const response = await fetch(`http://localhost:3001/update-role/${editingRole.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role_name: roleName }),
      });
      if (response.ok) {
        fetchRoles();
        setRoleName("");
        setEditingRole(null);
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  const handleDeleteRole = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/delete-role/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchRoles();
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setRoleName("");
    setEditingRole(null);
  };

  const handleEditClick = (role) => {
    setEditingRole(role);
    setRoleName(role.role_name);
    setOpen(true);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "role_name", headerName: "Role Name", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleEditClick(params.row)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteRole(params.row.id)}>
            <Delete />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Role
      </Button>
      <div style={{ height: 400, width: "100%", marginTop: 20 }}>
        <DataGrid rows={roles} columns={columns} pageSize={5} />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editingRole ? "Edit Role" : "Add Role"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Role Name"
            type="text"
            fullWidth
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={editingRole ? handleEditRole : handleAddRole} color="primary">
            {editingRole ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRole;