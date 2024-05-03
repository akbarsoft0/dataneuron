import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "./BaseUrl";

function Task2() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({ name: "", age: null, email: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [buttonText, setButtonText] = useState("Add");
  const [count, setCount] = useState();
  const API = baseUrl;
  // Add data
  const addData = async () => {
    try {
      const res = await axios.post(`${API}/add`, data);
      console.log(res);
      setData({ name: "", age: "", email: "" });
    } catch (error) {
      console.log(error);
    }
  };

  // Update data
  const updateData = async () => {
    try {
      if (data.name.length > 0) {
        const response = await axios.put(
          `${API}/update/${selectedUserId}`,
          data
        );
        console.log(response.data); // Data updated successfully
        setData({ name: "", age: "", email: "" });
        setButtonText("add");
      } else {
        alert(`please enter data`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Delete data
  const deleteData = async (id, name) => {
    try {
      const response = await axios.delete(`${API}/delete/${id}`);
      console.log(response.data); // Data delete successfully
    } catch (error) {
      console.error(error);
    }
  };

  // Get counts
  const getCount = async () => {
    try {
      const response = await axios.get(`${API}/count`);
      setCount(response.data);
      console.log(response.data); // { addCount: 5, updateCount: 3 }
    } catch (error) {
      console.error(error);
    }
  };

  // runs on input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  //runs on Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      updateData();
    } else {
      addData();
    }
  };

  // Set selected user for editing
  const handleEdit = (user) => {
    setEditMode(true);
    setSelectedUserId(user._id);
    setData({ name: user.name, age: user.age, email: user.email });
    setButtonText("Update Data");
  };

  //runs on page reload
  const getUsers = async () => {
    try {
      const usersData = await axios.get(`${API}/data`);
      setUsers(usersData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    getCount();
    console.log("runnig");
  }, []);

  useEffect(() => {
    getUsers();
    // getCount();
  }, [addData, updateData, deleteData, getCount]);

  return (
    <div>
      <Link to="/">task 1</Link>
      <h3>Added Counts: {count}</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={data.age}
          onChange={handleChange}
        />
        <button type="submit">{buttonText}</button>
      </form>
      {/* Display users */}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => deleteData(user._id, user.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul></ul>
    </div>
  );
}

export default Task2;
