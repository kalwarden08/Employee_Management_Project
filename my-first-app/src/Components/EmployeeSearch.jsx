import axios from "axios";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EmployeeSearch() {
  const [searchId, setSearchId] = useState("");
  const [searchedUser, setSearchedUser] = useState(null);
  const navigate = useNavigate();

  async function handleSearch() {
    if (!searchId.trim()) {
      toast.warning("Please enter an ID");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8080/emp/get/${searchId}`);
      if (response.data) {
        setSearchedUser(response.data);
        toast.success("Employee found");
      } else {
        setSearchedUser(null);
        toast.error("Employee not found");
      }
    } catch (error) {
      setSearchedUser(null);
      toast.error("Employee not found");
    }
  }

  async function deleteUserBYId(id) {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/emp/delete/${id}`);
      toast.success("Employee deleted successfully");
      setSearchedUser(null);
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  }

  function clearSearch() {
    setSearchId("");
    setSearchedUser(null);
  }

  return (
    <div className="card search-card centered-card">
      <h2>Search Employee by ID</h2>
      
      <div className="search-form">
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <div className="button-group">
          <button className="btn btn-search" onClick={handleSearch}>Search</button>
          {(searchedUser || searchId) && (
            <button className="btn btn-secondary" onClick={clearSearch}>Clear</button>
          )}
        </div>
      </div>

      {searchedUser && (
        <div className="search-result-card">
          <h3>Search Result</h3>
          <div className="result-field">
            <span className="field-label">ID:</span>
            <span className="field-value highlight-badge">{searchedUser.id}</span>
          </div>
          <div className="result-field">
            <span className="field-label">Name:</span>
            <span className="field-value">{searchedUser.name}</span>
          </div>
          <div className="result-field">
            <span className="field-label">Address:</span>
            <span className="field-value">{searchedUser.address}</span>
          </div>
          <div className="result-field">
            <span className="field-label">Salary:</span>
            <span className="field-value">₹{searchedUser.salary}</span>
          </div>
          <div className="search-result-actions">
            <button className="btn btn-table-edit" onClick={() => navigate(`/edit/${searchedUser.id}`)}>
              Edit
            </button>
            <button className="btn btn-table-delete" onClick={() => deleteUserBYId(searchedUser.id)}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeSearch;
