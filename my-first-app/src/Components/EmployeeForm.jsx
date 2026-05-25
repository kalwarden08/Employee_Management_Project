import axios from "axios";
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [salary, setSalary] = useState("");

  useEffect(() => {
    if (isEdit) {
      axios.get(`https://employee-management-project-zm0m.onrender.com/emp/get/${id}`)
        .then(response => {
          if (response.data) {
            setName(response.data.name);
            setAddress(response.data.address);
            setSalary(response.data.salary);
          }
        })
        .catch(error => {
          toast.error("Failed to load employee");
          navigate("/");
        });
    } else {
      setName("");
      setAddress("");
      setSalary("");
    }
  }, [id, isEdit]);

  async function sendDetails() {
    let empDetails = {
      name: name,
      address: address,
      salary: salary
    };

    try {
      if (isEdit) {
        await axios.put(`https://employee-management-project-zm0m.onrender.com/emp/update/${id}`, empDetails);
        toast.success("Details Updated Successfully");
      } else {
        await axios.post("https://employee-management-project-zm0m.onrender.com/emp/add", empDetails);
        toast.success("Details Sent Successfully");
      }
      navigate("/");
    } catch (error) {
      toast.error("Failed to save details");
    }
  }

  return (
    <div className="card form-card centered-card">
      <h2>{isEdit ? "Edit Employee" : "Add Employee"}</h2>
      
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Address</label>
        <input
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Salary (INR)</label>
        <input
          type="text"
          placeholder="Enter Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={sendDetails}>
          {isEdit ? "Update" : "Submit"}
        </button>
        <button className="btn btn-secondary" onClick={() => navigate("/")}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default EmployeeForm;
