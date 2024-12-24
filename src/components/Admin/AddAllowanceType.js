import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./css/AddEmployee.css"; // Optional: Custom CSS for styling

const AddAllowanceType = () => {
  // State to manage the allowance type input
  const [allowanceType, setAllowanceType] = useState("");
  const [allowanceList, setAllowanceList] = useState([]); // List to store allowance types
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Fetch allowance types from the backend
  useEffect(() => {
    const fetchAllowanceTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/allowance-types');
        const data = await response.json();
        setAllowanceList(data);
      } catch (error) {
        console.error('Error fetching allowance types:', error);
      }
    };

    fetchAllowanceTypes();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setAllowanceType(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (allowanceType.trim() === "") {
      alert("Please enter an allowance type.");
      return;
    }

    if (isEditing) {
      // Update the edited allowance type
      try {
        const response = await fetch(`http://localhost:3001/update-allowance-type/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Allowance_type: allowanceType }),
        });
        const updatedAllowance = await response.json();
        setAllowanceList((prevList) =>
          prevList.map((allowance) =>
            allowance.id === editingId ? updatedAllowance : allowance
          )
        );
        alert(`Allowance Type has been updated successfully.`);
        setIsEditing(false);
        setEditingId(null);
      } catch (error) {
        console.error('Error updating allowance type:', error);
      }
    } else {
      // Add the new allowance type to the list
      try {
        const response = await fetch('http://localhost:3001/add-allowance-type', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Allowance_type: allowanceType }),
        });
        const newAllowance = await response.json();
        setAllowanceList((prevList) => [...prevList, newAllowance]);
        alert(`Allowance Type "${allowanceType}" has been added successfully.`);
      } catch (error) {
        console.error('Error adding allowance type:', error);
      }
    }

    setAllowanceType(""); // Reset the form
  };

  // Handle delete action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this allowance type?")) {
      try {
        await fetch(`http://localhost:3001/delete-allowance-type/${id}`, {
          method: 'DELETE',
        });
        setAllowanceList((prevList) =>
          prevList.filter((allowance) => allowance.id !== id)
        );
      } catch (error) {
        console.error('Error deleting allowance type:', error);
      }
    }
  };

  // Handle edit action
  const handleEdit = (id, type) => {
    setIsEditing(true);
    setEditingId(id);
    setAllowanceType(type);
  };

  return (
    <div className="add-allowance-type-container">
      <h2>{isEditing ? "Edit Allowance Type" : "Add Allowance Type"}</h2>
      <form onSubmit={handleSubmit} className="allowance-type-form">
        <div className="form-group">
          <label htmlFor="allowanceType" className="form-label">
            Allowance Type:
          </label>
          <input
            type="text"
            id="allowanceType"
            value={allowanceType}
            onChange={handleInputChange}
            placeholder="Enter Allowance Type"
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          {isEditing ? "Update" : "Submit"}
        </button>
      </form>

      {/* Display the table */}
      <div className="allowance-type-table-container">
        <h3>Allowance Types</h3>
        <table className="allowance-type-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Allowance Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allowanceList.length === 0 ? (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No Allowance Types Added
                </td>
              </tr>
            ) : (
              allowanceList.map((allowance, index) => (
                <tr key={allowance.id}>
                  <td>{index + 1}</td>
                  <td>{allowance.allowance_type}</td>
                  <td>
                    <button
                      className="action-btn edit-btn"
                      title="Edit"
                      onClick={() => handleEdit(allowance.id, allowance.allowance_type)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(allowance.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AddAllowanceType;