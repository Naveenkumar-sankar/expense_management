import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; // Importing custom CSS for styling

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Predefined users for demonstration purposes
  const users = [
    { userId: "admin123", password: "adminpass", role: "admin" },
    { userId: "accountant123", password: "accountantpass", role: "accountant" },
    { userId: "manager123", password: "managerpass", role: "manager" },
    { userId: "employee123", password: "employeepass", role: "employee" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if user credentials match any predefined user
    const user = users.find(
      (u) => u.userId === userId && u.password === password && u.role === role
    );

    if (user) {
      // Navigate to the respective dashboard based on role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "accountant") {
        navigate("/accountant");
      } else if (role === "manager") {
        navigate("/manager");
      } else if (role === "employee") {
        navigate("/employee");
      }
    } else {
      // Show error message if credentials are invalid
      setErrorMessage("Invalid credentials or role. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>User ID</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your user ID"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin</option>
              <option value="accountant">Accountant</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
