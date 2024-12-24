import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./AccountantSidebar"; // Assuming Sidebar is in the same folder
import "./css/Dashboard.css"; // Add custom CSS for the Accountant Dashboard

const AccountantDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-main">
        <div className="dashboard-header">
          <h1>Accountant Dashboard</h1>
        </div>
        <div className="dashboard-content">
          <Outlet /> {/* This will render the content of the selected menu item */}
        </div>
      </div>
    </div>
  );
};

export default AccountantDashboard;
