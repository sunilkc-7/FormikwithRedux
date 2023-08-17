import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  addUser,
  updateUser,
  deleteUser,
} from "../actions/userActions";
import { useFormik } from "formik";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const [actionType, setActionType] = useState("");

  const formik = useFormik({
    initialValues: {
      ISO: "",
      country: "",
      population: "",
    },
    onSubmit: (values) => {
      if (actionType === "ADD") {
        handleAddUser(values);
      } else if (actionType === "UPDATE") {
        handleUpdateUser({ ...formik.initialValues, ...values });
      }
    },
  });

  const handleModalClose = () => {
    setShow(false);
    formik.resetForm();
  };

  const handleModalShow = (type, user = {}) => {
    setActionType(type);
    formik.setValues({
      _id: user._id || "", // <-- Add this to ensure we have the user's ID
      ISO: user.ISO || "",
      country: user.country || "",
      population: user.population || "",
    });
    setShow(true);
  };

  const handleAddUser = (values) => {
    dispatch(addUser(values));
    handleModalClose();
  };

  const handleUpdateUser = (values) => {
    dispatch(
      updateUser({
        _id: values._id,
        ISO: values.ISO,
        country: values.country,
        population: values.population,
      })
    );
    handleModalClose();
  };

  const handleDeleteUser = (userId) => {
    dispatch(deleteUser(userId));
    handleModalClose();
  };

  return (
    <div>
      <button onClick={() => handleModalShow("ADD")}>Add New User</button>
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
          <form onSubmit={formik.handleSubmit}>
            <input
              name="ISO"
              placeholder="ISO"
              onChange={formik.handleChange}
              value={formik.values.ISO}
            />
            <input
              name="country"
              placeholder="Country"
              onChange={formik.handleChange}
              value={formik.values.country}
            />
            <input
              name="population"
              placeholder="Population"
              onChange={formik.handleChange}
              value={formik.values.population}
            />
            {actionType === "ADD" && <button type="submit">Add User</button>}
            {actionType === "UPDATE" && (
              <button type="submit">Update User</button>
            )}
          </form>

          {actionType === "DELETE" && (
            <>
              <p>Are you sure you want to delete {formik.values.name}?</p>
              <button onClick={() => handleDeleteUser(formik.values._id)}>
                Yes, Delete
              </button>
            </>
          )}
          <button onClick={handleModalClose}>Close Modal</button>
        </div>
      )}
    </div>
  );
};

export default App;
