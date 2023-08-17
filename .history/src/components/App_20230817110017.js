import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../actions/userActions";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [show, setShow] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleModalClose = () => setShow(false);
  const handleModalShow = (action, user) => {
    setActionType(action);
    setSelectedUser(user);
    setShow(true);
  };

  const handleDelete = () => {
    dispatch(deleteUser(selectedUser.id));
    setShow(false);
  };

  const handleUpdate = () => {
    const updatedUser = {
      ...selectedUser,
      name: selectedUser.name,
      country: selectedUser.country,
    };
    dispatch(updateUser(updatedUser));
    setShow(false);
  };

  const handleAdd = () => {
    const newUser = {
      id: Date.now(),
      name: "",
      country: "",
    };
    dispatch(addUser(newUser));
    setShow(false);
  };

  return (
    <div>
      <table className="styled-table">
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
                <Button onClick={() => handleModalShow("UPDATE", user)}>
                  <FaEdit />
                </Button>
                <Button onClick={() => handleModalShow("DELETE", user)}>
                  <FaTrash />
                </Button>
                <Button onClick={() => handleModalShow("ADD")}>
                  <FaPlus />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={show} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{actionType} User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {actionType === "UPDATE" && (
            <>
              <input
                value={selectedUser && selectedUser.ISO}
                placeholder="ISO"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, ISO: e.target.value })
                }
              />
              <input
                value={selectedUser && selectedUser.country}
                placeholder="Country"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, country: e.target.value })
                }
              />
            </>
          )}
          {actionType === "DELETE" && (
            <p>Are you sure you want to delete this user?</p>
          )}
          {actionType === "ADD" && (
            <>
              <input
                placeholder="ISO"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, ISO: e.target.value })
                }
              />
              <input
                placeholder="Country"
                onChange={(e) =>
                  setSelectedUser({ ...selectedUser, country: e.target.value })
                }
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {actionType === "UPDATE" && (
            <Button onClick={handleUpdate}>Update</Button>
          )}
          {actionType === "DELETE" && (
            <Button onClick={handleDelete}>Delete</Button>
          )}
          {actionType === "ADD" && <Button onClick={handleAdd}>Add</Button>}
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
