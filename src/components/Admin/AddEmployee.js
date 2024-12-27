import React, { useState, useEffect } from "react";
import "./css/AddEmployee.css"; // Optional custom CSS for styling

const AddEmployee = ({ employee, onClose, onSave }) => {
  // State to hold form data
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    profilePicture: null,
    role: "",
    managerName: "",
  });

  // State to hold the list of managers
  const [managerNames, setManagerNames] = useState([]);

  // Effect to fetch managers from the backend
  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const response = await fetch("http://localhost:3001/employees?role=Manager");
        const data = await response.json();
        setManagerNames(data);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };

    fetchManagers();
  }, []);

  // Effect to pre-fill form fields if editing an employee
  useEffect(() => {
    if (employee) {
      setEmployeeData({
        name: employee.name,
        email: employee.email,
        contactNumber: employee.contact_number,
        profilePicture: null, // Reset profile picture input
        role: employee.role,
        managerName: employee.manager_name,
      });
    }
  }, [employee]);

  // Handler to update form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handler for profile picture upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEmployeeData((prevData) => ({
      ...prevData,
      profilePicture: file,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', employeeData.name);
    formData.append('email', employeeData.email);
    formData.append('contactNumber', employeeData.contactNumber);
    if (employeeData.profilePicture) {
      formData.append('profile_picture', employeeData.profilePicture); // Change this to match the backend field name
    }
    formData.append('role', employeeData.role);
    formData.append('managerName', employeeData.managerName);

    try {
      const response = await fetch(
        employee ? `http://localhost:3001/update-employee/${employee.id}` : 'http://localhost:3001/add-employee',
        {
          method: employee ? 'PUT' : 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log('Employee Data Submitted: ', result);
        alert('Employee details have been submitted successfully!');
        onSave(result);
        setEmployeeData({
          name: '',
          email: '',
          contactNumber: '',
          profilePicture: null,
          role: '',
          managerName: '',
        });
      } else {
        const errorText = await response.text();
        console.error('Failed to submit employee details:', errorText);
        alert('Failed to submit employee details');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting employee details');
    }
  };

  return (
    <div className="add-employee-container">
      <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit} className="add-employee-form">
        {/* Name */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={employeeData.name}
            onChange={handleInputChange}
            placeholder="Enter employee name"
          />
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={employeeData.email}
            onChange={handleInputChange}
            placeholder="Enter employee email"
          />
        </div>

        {/* Contact Number */}
        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={employeeData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter contact number"
          />
        </div>

        {/* Profile Picture */}
        <div className="form-group">
          <label htmlFor="profilePicture">Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profile_picture" // Change this to match the backend field name
            onChange={handleFileChange}
            accept="image/*"
          />
        </div>

        {/* Role Selection */}
        <div className="form-group">
          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={employeeData.role}
            onChange={handleInputChange}
          >
            <option value="">Select Role</option>
            <option value="Admin">Admin</option>
            <option value="Accountant">Accountant</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>
        </div>

        {/* Manager Name (only for Employees) */}
        {employeeData.role === "Employee" && (
          <div className="form-group">
            <label htmlFor="managerName">Manager Name</label>
            <select
              id="managerName"
              name="managerName"
              value={employeeData.managerName}
              onChange={handleInputChange}
            >
              <option value="">Select Manager</option>
              {managerNames.map((manager) => (
                <option key={manager.id} value={manager.name}>
                  {manager.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="submit-button">
          {employee ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;