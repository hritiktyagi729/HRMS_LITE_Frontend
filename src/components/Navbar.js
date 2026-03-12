import React from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
const location = useLocation();

const isActive = (path) =>
location.pathname === path ? "nav-link active" : "nav-link";

return ( <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow-sm sticky-top"> <div className="container">


    <Link className="navbar-brand fw-bold" to="/">
      HRMS
    </Link>
  
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navMenu"
    >
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navMenu">
      <ul className="navbar-nav ms-auto">

        <li className="nav-item">
          <Link className={isActive("/")} to="/">
            Employees
          </Link>
        </li>

        <li className="nav-item">
          <Link className={isActive("/add")} to="/add">
            Add Employee
          </Link>
        </li>

        <li className="nav-item">
          <Link className={isActive("/attendance")} to="/attendance">
            Mark Attendance
          </Link>
        </li>

        <li className="nav-item">
          <Link className={isActive("/view-attendance")} to="/view-attendance">
            Attendance
          </Link>
        </li>

      </ul>
    </div>

  </div>
</nav>


);
}

export default Navbar;
