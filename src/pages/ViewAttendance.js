import React, { useState, useEffect } from 'react';
import API from '../api/api';

function ViewAttendance() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoadingEmployees(true);
      setError(null);
      const res = await API.get('/employee_list/');
      setEmployees(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch employees';
      setError(errorMsg);
      setEmployees([]);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchAttendance = async (employeeId) => {
    if (!employeeId) {
      setAttendance([]);
      return;
    }

    try {
      setLoadingAttendance(true);
      setError(null);
      const res = await API.get(`/view_attendance/${employeeId}/`);
      console.log('Attendance response:', res);
      if (Array.isArray(res.data)) {
        setAttendance(res.data);
      } else if (res.data.attendanceRecords) {
        setAttendance(res.data.attendanceRecords);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to fetch attendance';
      setError(errorMsg);
      setAttendance([]);
    } finally {
      setLoadingAttendance(false);
    }
  };

  const handleEmployeeChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployeeId(employeeId);
    if (employeeId) {
      fetchAttendance(employeeId);
    } else {
      setAttendance([]);
    }
  };

  const selectedEmployee = employees.find(emp => emp.employeeId === selectedEmployeeId);

  return (
    <div>
      <h3>View Attendance</h3>

      {loadingEmployees && <p className="alert alert-info">Loading employees...</p>}
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

      {!loadingEmployees && employees.length > 0 && (
        <div className="form-group mb-3">
          <label>Select Employee</label>
          <select 
            className="form-control"
            value={selectedEmployeeId}
            onChange={handleEmployeeChange}
          >
            <option value="">-- Select Employee --</option>
            {employees.map(emp => (
              <option key={emp.employeeId} value={emp.employeeId}>
                {emp.fullName}
              </option>
            ))}
          </select>
        </div>
      )}

      {loadingAttendance && <p className="alert alert-info">Loading attendance records...</p>}

      {!loadingAttendance && selectedEmployeeId && (
        <>
          {attendance.length > 0 ? (
            <div>
              <h5 className="mt-4">Attendance Records for {selectedEmployee?.fullName}</h5>
              <table className="table table-bordered table-striped mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((record, index) => (
                    <tr key={index}>
                      <td>{record.date || record.dateTime}</td>
                      <td>
                        <span className={`badge ${record.status === 'PRESENT' ? 'bg-success' : 'bg-danger'}`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="alert alert-info">No attendance records found for this employee.</p>
          )}
        </>
      )}
    </div>
  );
}

export default ViewAttendance;
