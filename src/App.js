import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList';
import AddEmployee from './pages/AddEmployee';
import Attendance from './pages/Attendance';
import ViewAttendance from './pages/ViewAttendance';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Switch>
          <Route path="/" exact component={EmployeeList} />
          <Route path="/add" component={AddEmployee} />
          <Route path="/attendance" component={Attendance} />
          <Route path="/view-attendance" component={ViewAttendance} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
