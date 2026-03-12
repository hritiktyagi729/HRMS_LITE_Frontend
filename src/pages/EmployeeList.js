import React, { useEffect, useState } from "react";
import API from "../api/api";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const deleteEmployee = async (id) => {
    await API.delete(`/delete_employee/${id}/`);
    fetchEmployees();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Employee List</h3>

      {loading && <p className="alert alert-info">Loading employees...</p>}

      {error && (
        <div className="alert alert-danger">
          Error: {error}
          <button
            className="btn btn-sm btn-warning ms-2"
            onClick={fetchEmployees}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="row g-3">
          {employees.length === 0 ? (
            <p className="text-center">No employees found</p>
          ) : (
            employees.map((emp) => (
              <div key={emp.employeeId} className="col-12 col-md-6 col-lg-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{emp.fullName}</h5>

                    <p className="mb-1">
                      <strong>ID:</strong> {emp.employeeId}
                    </p>

                    <p className="mb-1">
                      <strong>Email:</strong> {emp.email}
                    </p>

                    <p className="mb-3">
                      <strong>Department:</strong> {emp.department}
                    </p>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEmployee(emp.employeeId)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;