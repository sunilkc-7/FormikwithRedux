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
      id: Date.now(),
      name: newUserName,
      country: newUserCountry,
    };
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

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
            <th>ISO</th>
            <th>Country</th>
            <th>Population</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.ISO}</td>
              <td>{user.country}</td>
              <td>{user.population}</td>
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
