import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function EmployeeList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  async function getALLUsers() {
    try {
      const response = await axios.get("http://localhost:8080/emp/allusers");
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch employees list");
    }
  }

  async function deleteUserBYId(id) {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/emp/delete/${id}`);
      toast.success("Employee deleted successfully");
      getALLUsers();
    } catch (error) {
      toast.error("Failed to delete employee");
    }
  }

  useEffect(() => {
    getALLUsers();
  }, []);

  return (
    <div className="card list-card">
      <div className="list-header">
        <h2>Employee Records ({users.length})</h2>
        <button className="btn btn-refresh" onClick={getALLUsers}>
          Refresh
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No employee records found.</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ADDRESS</th>
                <th>SALARY</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td><span className="id-badge">{user.id}</span></td>
                  <td className="emp-name-cell">{user.name}</td>
                  <td>{user.address}</td>
                  <td className="salary-cell">₹{user.salary}</td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-table-edit" onClick={() => navigate(`/edit/${user.id}`)}>
                        Edit
                      </button>
                      <button className="btn btn-table-delete" onClick={() => deleteUserBYId(user.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
