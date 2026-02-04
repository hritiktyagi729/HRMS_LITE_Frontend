import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">HRMS</Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Employees</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add Employee</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/attendance">Mark Attendance</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/view-attendance">View Attendance</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
