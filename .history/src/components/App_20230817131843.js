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

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [actionType, setActionType] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  console.log(selectedUser, "data");

  const handleModalClose = () => setShow(false);
  const handleModalShow = (type, user) => {
    setActionType(type);
    setSelectedUser(user);
    setShow(true);
  };

  const handleAddUser = () => {
    const user = {
      name: selectedUser.name,
      country: selectedUser.country,
      ISO: selectedUser.ISO,
      population: selectedUser.population,
    };
    dispatch(addUser(user));
    handleModalClose();
  };

  const handleUpdateUser = () => {
    dispatch(updateUser({ ...selectedUser, id: undefined }));
    handleModalClose();
  };

  const handleDeleteUser = () => {
    dispatch(deleteUser(selectedUser._id));
    handleModalClose();
  };

  return (
    <div>
      <button onClick={() => handleModalShow("ADD", {})}>Add New User</button>
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
            <tr key={user._id}>
              <td>{user.ISO}</td>
              <td>{user.country}</td>
              <td>{user.population}</td>
              <td>
                <button onClick={() => handleModalShow("UPDATE", user)}>
                  Update
                </button>
                <button onClick={() => handleModalShow("DELETE", user)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {show && (
        <div className="modal">
          {actionType === "ADD" && (
            <>
              <input
                placeholder="ISO"
                onChange={(e) =>
                  setSelectedUser((prev) => ({ ...prev, ISO: e.target.value }))
                }
              />
              <input
                placeholder="Country"
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
              <input
                placeholder="Population"
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    population: e.target.value,
                  }))
                }
              />
              <button onClick={handleAddUser}>Add User</button>
            </>
          )}

          {actionType === "UPDATE" && (
            <>
              <input
                defaultValue={selectedUser.ISO}
                onChange={(e) =>
                  setSelectedUser((prev) => ({ ...prev, ISO: e.target.value }))
                }
              />
              <input
                defaultValue={selectedUser.country}
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
              <input
                defaultValue={selectedUser.population}
                onChange={(e) =>
                  setSelectedUser((prev) => ({
                    ...prev,
                    population: e.target.value,
                  }))
                }
              />
              <button onClick={handleUpdateUser}>Update User</button>
            </>
          )}

          {actionType === "DELETE" && (
            <>
              <p>Are you sure you want to delete {selectedUser.name}?</p>
              <button onClick={handleDeleteUser}>Yes, Delete</button>
            </>
          )}

          <button onClick={handleModalClose}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default App;
