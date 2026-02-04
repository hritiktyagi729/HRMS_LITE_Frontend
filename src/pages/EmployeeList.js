import React, { useEffect, useState } from 'react';
import API from '../api/api';

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
      const res = await API.get('/employee_list/');
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch employees';
      setError(errorMsg);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteEmployee = async (id) => {
    // Django view `delete_employee/<ulid>/`
    await API.delete(`/delete_employee/${id}/`);
    fetchEmployees();
  };

  return (
    <div>
      <h3>Employee List</h3>

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
      <table className="table table-bordered mt-3">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.employeeId}>
              <td>{emp.employeeId}</td>
              <td>{emp.fullName}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteEmployee(emp.employeeId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
}

export default EmployeeList;
