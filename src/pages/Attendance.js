import React, { useState, useEffect } from 'react';
import API from '../api/api';

function Attendance() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendance, setAttendance] = useState({
    employeeId: '',
    date: '',
    status: 'PRESENT'
  });
  const [successMessage, setSuccessMessage] = useState('');

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
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'employeeName') {
      const selected = employees.find(emp => emp.fullName === value);
      setAttendance({ 
        ...attendance, 
        employeeId: selected ? selected.employeeId : ''
      });
    } else {
      setAttendance({ ...attendance, [name]: value });
    }
  };

  const markAttendance = async (e) => {
    e.preventDefault();
    if (!attendance.employeeId || !attendance.date) {
      setError('Please select employee and date');
      return;
    }

    try {
      setError(null);
      setSuccessMessage('');
      const res = await API.post('/mark_attendance/', attendance);
      setSuccessMessage(res.data.message || 'Attendance marked successfully');
      setAttendance({
        employeeId: '',
        date: '',
        status: 'PRESENT'
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to mark attendance');
    }
  };

  return (
    <div className="card p-4">
      <h3>Mark Attendance</h3>

      {loading && <p className="alert alert-info">Loading employees...</p>}
      {error && <p className="alert alert-danger">{error}</p>}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}

      {!loading && employees.length > 0 && (
      <form onSubmit={markAttendance}>
       
        <div className="form-group mb-2 row g-2">
          <label>Employee Name</label>
          <select 
            className="form-control" 
            name="employeeName" 
            onChange={handleChange}
            value={employees.find(e => e.employeeId === attendance.employeeId)?.fullName || ''}
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.employeeId} value={emp.fullName}>
                {emp.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group mb-2">
          <label>Date</label>
          <input 
            className="form-control" 
            type="date" 
            name="date" 
            value={attendance.date}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group mb-2">
          <label>Status</label>
          <select 
            className="form-control" 
            name="status" 
            value={attendance.status}
            onChange={handleChange}
          >
            <option value="PRESENT">Present</option>
            <option value="ABSENT">Absent</option>
          </select>
        </div>
          
        <button className="btn btn-success">Submit</button>
      </form>
      )}
    </div>
  );
}

export default Attendance;
