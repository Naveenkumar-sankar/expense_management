import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Login";
import Logout from "./components/Login";
import AdminDashboard from "./components/AdminDashboard";
import EmployeeDetails from "./components/Admin/EmployeeDetails";
import AddEmployee from "./components/Admin/AddEmployee";
import AddAllowanceType from "./components/Admin/AddAllowanceType";
import AllowanceDetails from "./components/Admin/AllowanceDetails";
import AllowanceDetails1 from "./components/Accountant/AllowanceDetails1";
import AllowanceDetails2 from "./components/Manager/AllowanceDetails2";
import AllowanceDetails3 from "./components/Employee/AllowanceDetails3";
import SetBudget from "./components/Admin/SetBudget";
import AccountantDashboard from "./components/AccountantDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";

import AddAllowance from "./components/Employee/AddAllowance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="employee-details" element={<EmployeeDetails />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="add-allowance-type" element={<AddAllowanceType />} />
          <Route path="allowance-details" element={<AllowanceDetails />} />
          <Route path="set-budget" element={<SetBudget />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/accountant" element={<AccountantDashboard />}>
        <Route path="allowance-details1" element={<AllowanceDetails1 />} />
          
          <Route path="employee-details" element={<EmployeeDetails />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/manager" element={<ManagerDashboard />}>
          <Route path="allowance-details2" element={<AllowanceDetails2 />} />
          
          <Route path="add-allowance" element={<AddAllowance />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="/employee" element={<EmployeeDashboard />}>
          <Route path="allowance-details3" element={<AllowanceDetails3 />} />
                   <Route path="add-allowance" element={<AddAllowance />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
