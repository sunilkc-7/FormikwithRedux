// src/components/App.js

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../actions/userActions";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  const [newUserName, setNewUserName] = useState("");
  const [newUserCountry, setNewUserCountry] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(), // This is a simple unique id generator for the demo.
      name: newUserName,
      country: newUserCountry,
    };
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  // For simplicity, we'll assume updates occur inline within the table.
  const handleUpdateUser = (user) => {
    const updatedName = prompt("Enter new name", user.name);
    const updatedCountry = prompt("Enter new country", user.country);
    if (updatedName && updatedCountry) {
      dispatch(
        updateUser({ ...user, name: updatedName, country: updatedCountry })
      );
    }
  };

  return (
    <div>
      <div>
        <input
          placeholder="Name"
          value={newUserName}
          onChange={(e) => setNewUserName(e.target.value)}
        />
        <input
          placeholder="Country"
          value={newUserCountry}
          onChange={(e) => setNewUserCountry(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.country}</td>
              <td>
                <button onClick={() => handleUpdateUser(user)}>Update</button>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
