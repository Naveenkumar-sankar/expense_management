import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaUserCog, FaUsers, FaUserPlus, FaWallet, FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons
import "./css/Sidebar.css";

const Sidebar = () => {
  // Mock user data for demonstration
  const userId = "admin123";
  const profilePicture = "https://via.placeholder.com/50"; // Placeholder profile picture

  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data (this is a simple example; in a real app, you'd clear auth tokens)
    localStorage.removeItem("user"); // Example: clearing user data from localStorage
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={profilePicture} alt="Profile" className="sidebar-profile-picture" />
        <p className="sidebar-user-id">Admin ID: {userId}</p>
      </div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>
          <Link to="/admin/employee-details">
            <FaUsers className="menu-icon" /> Employee Details
          </Link>
        </li>
        {/* <li>
          <Link to="/admin/add-employee">
            <FaUserPlus className="menu-icon" /> Add Employee
          </Link>
        </li> */}
        {/* <li>
          <Link to="/admin/add-allowance-type">
            <FaUserCog className="menu-icon" /> Add Allowance Type
          </Link>
        </li> */}
        <li>
          <Link to="/admin/allowance-details">
            <FaWallet className="menu-icon" /> Allowance Details
          </Link>
        </li>
        <li>
          <Link to="/admin/set-budget">
            <FaWallet className="menu-icon" /> Set Budget
          </Link>
        </li>
      </ul>
      <button onClick={handleLogout} className="logout-button">
        <FaSignOutAlt className="menu-icon" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
