import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Dashboard() {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await API.get("/employee_list/");
      setEmployees(Array.isArray(res.data) ? res.data : []);

    } catch (err) {

      const errorMsg =
        err.response?.data?.detail ||
        err.message ||
        "Failed to fetch employees";

      setError(errorMsg);
      setEmployees([]);

    } finally {
      setLoading(false);
    }
  };

  const recentEmployees = employees.slice(-4).reverse();

  return (
    <div className="container mt-4">

      {/* Welcome Header */}

      <div
        className="p-4 mb-4 text-white rounded shadow-sm"
        style={{
          background: "linear-gradient(135deg,#6366F1,#4F46E5)"
        }}
      >
        <h4 className="fw-bold">
          Welcome back, Admin 👋
        </h4>

        <p className="mb-0">
          {new Date().toDateString()}
        </p>

        <small>
          Manage employees and attendance easily
        </small>
      </div>

      {/* Stats Cards */}

      <div className="row g-3 mb-4">

        <StatCard
          title="Total Employees"
          value={employees.length}
          icon="👥"
          color="#6366F1"
        />

        <StatCard
          title="Departments"
          value={
            new Set(employees.map(e => e.department)).size
          }
          icon="🏢"
          color="#10B981"
        />

      </div>

      {/* Main Grid */}

      <div className="row g-3">

        {/* Recent Employees */}

        <div className="col-lg-6">

          <div className="card shadow-sm">

            <div className="card-body">

              <div className="d-flex justify-content-between mb-3">

                <h5 className="fw-bold">
                  Recent Employees
                </h5>

                <Link to="/">
                  View All →
                </Link>

              </div>

              {loading && <p>Loading...</p>}

              {error && (
                <p className="text-danger">
                  {error}
                </p>
              )}

              {!loading && recentEmployees.map(emp => (

                <div
                  key={emp.employeeId}
                  className="d-flex align-items-center mb-3"
                >

                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                    style={{
                      width: 40,
                      height: 40,
                      background: "#6366F1"
                    }}
                  >
                    {emp.fullName?.charAt(0)}
                  </div>

                  <div>

                    <div className="fw-bold">
                      {emp.fullName}
                    </div>

                    <small className="text-muted">
                      {emp.department} • {emp.employeeId}
                    </small>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="col-lg-6">

          <div className="card shadow-sm">

            <div className="card-body">

              <h5 className="fw-bold mb-3">
                Quick Actions
              </h5>

              <ActionCard
                title="Manage Employees"
                desc="View employee list"
                link="/"
                color="#6366F1"
              />

              <ActionCard
                title="Add Employee"
                desc="Create a new employee record"
                link="/add"
                color="#10B981"
              />

              <ActionCard
                title="Mark Attendance"
                desc="Track employee attendance"
                link="/attendance"
                color="#F59E0B"
              />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

/* Stat Card */

function StatCard({ title, value, icon, color }) {

  return (

    <div className="col-md-6 col-lg-3">

      <div
        className="card border-0 shadow-sm"
        style={{
          borderLeft: `5px solid ${color}`
        }}
      >

        <div className="card-body d-flex align-items-center">

          <div
            className="fs-3 me-3"
            style={{ color }}
          >
            {icon}
          </div>

          <div>

            <small className="text-muted">
              {title}
            </small>

            <h4 className="fw-bold mb-0">
              {value}
            </h4>

          </div>

        </div>

      </div>

    </div>

  );
}

/* Quick Action Card */

function ActionCard({ title, desc, link, color }) {

  return (

    <Link
      to={link}
      className="text-decoration-none"
    >

      <div
        className="p-3 rounded mb-3"
        style={{
          background: "#F9FAFB",
          borderLeft: `5px solid ${color}`
        }}
      >

        <div className="fw-bold">
          {title}
        </div>

        <small className="text-muted">
          {desc}
        </small>

      </div>

    </Link>

  );
}

export default Dashboard;