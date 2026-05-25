import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import components
import Navbar from './Components/Navbar';
import EmployeeList from './Components/EmployeeList';
import EmployeeForm from './Components/EmployeeForm';
import EmployeeSearch from './Components/EmployeeSearch';

function App() {
  return (
    <BrowserRouter>
      <div className="dashboard-container">
        <ToastContainer position="top-right" autoClose={3000} theme="light" />
        
        <Navbar />
        
        <main className="dashboard-content-single">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/edit/:id" element={<EmployeeForm />} />
            <Route path="/search" element={<EmployeeSearch />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;