import React, { useState } from 'react';
import API from '../api/api';

function AddEmployee() {
  const [employee, setEmployee] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const saveEmployee = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);
      
      // call Django view `add_employee/`
      await API.post('/add_employee/', employee);
      setSuccess('Employee added successfully');
      setEmployee({
        employeeId: '',
        fullName: '',
        email: '',
        department: ''
      });
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error('Error adding employee:', err);
      const errorMsg = err.response?.data?.detail || err.message || 'Failed to add employee';
      setError(errorMsg);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-3" >Add Employee</h3>

      {error && <p className="alert alert-danger">{error}</p>}
      {success && <p className="alert alert-success">{success}</p>}

      <form onSubmit={saveEmployee}>
        <div className="row g-2">
      <div className="col-12 col-md-6">
        <input 
          className="form-control mb-2" 
          name="fullName" 
          placeholder="Full Name" 
          value={employee.fullName}
          onChange={handleChange}
          required
        />
        </div>
        <div className="col-12 col-md-6">
        <input 
          className="form-control mb-2" 
          name="email" 
          placeholder="Email" 
          type="email"
          value={employee.email}
          onChange={handleChange}
          required
        />
        </div>
        <div className="col-12">
        <input 
          className="form-control mb-2" 
          name="department" 
          placeholder="Department" 
          value={employee.department}
          onChange={handleChange}
          required
        />
        </div>
      </div>
        <button className="btn btn-primary">Save</button>
        
      </form>
    </div>
  );
}

export default AddEmployee;
