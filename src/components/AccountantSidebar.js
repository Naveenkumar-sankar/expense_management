import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { FaClipboardList,  FaSignOutAlt } from "react-icons/fa"; // Import icons from react-icons
import './css/Sidebar.css'; // Assuming the same Sidebar CSS can be reused

const Sidebar = () => {
  // Mock user data for demonstration
  const userId = "accountant123";
  const profilePicture = "https://via.placeholder.com/50"; // Placeholder profile picture

  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleLogout = () => {
    // You can clear any authentication data here (like cookies, localStorage, etc.)
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <img src={profilePicture} alt="Profile" className="sidebar-profile-picture" />
        <p className="sidebar-user-id">Accountant ID: {userId}</p>
      </div>

      {/* Sidebar Title */}
      <h2>Accountant Dashboard</h2>

      {/* Sidebar Menu */}
      <ul>
        <li>
          <Link to="/accountant/allowance-details1">
            <FaClipboardList className="menu-icon" /> Allowance Details
          </Link>
        </li>
        
       
      </ul>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">
        <FaSignOutAlt className="menu-icon" /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
