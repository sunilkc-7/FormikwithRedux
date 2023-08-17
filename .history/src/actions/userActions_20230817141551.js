import axios from "axios";

export const fetchUsersBegin = () => ({
  type: "FETCH_USERS_BEGIN",
});

export const fetchUsersSuccess = (users) => ({
  type: "FETCH_USERS_SUCCESS",
  payload: users,
});

export const fetchUsersError = (error) => ({
  type: "FETCH_USERS_ERROR",
  payload: error,
});

export const addUserSuccess = (user) => ({
  type: "ADD_USER",
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: "UPDATE_USER",
  payload: user,
});

export const deleteUserSuccess = (id) => ({
  type: "DELETE_USER",
  payload: id,
});

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersBegin());
    axios
      .get("http://192.168.1.140:5000/data/countrydata")
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error));
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    axios
      .post("http://192.168.1.140:5000/data/countrydata", user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Added User:", response.data);
        dispatch(addUserSuccess(response.data));
      })
      .then((response) => {
        console.log("Added User:", response.data);
        dispatch(addUserSuccess(response.data));
        dispatch(fetchUsers());
      })

      .catch((error) => {
        console.error("Error during adding user:", error);
      });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    axios
      .put(
        `http://192.168.1.140:5000/data/countrydata/${user._id}`,
        { ...user, _id: undefined },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Updated User:", response.data);
        dispatch(updateUserSuccess(response.data));
      })
      .catch((error) => {
        console.error("Error during updating user:", error);
      });
  };
};

export const deleteUser = (_id) => {
  return (dispatch) => {
    axios
      .delete(`http://192.168.1.140:5000/data/countrydata/${_id}`)
      .then((response) => {
        if (response.status === 200) {
          dispatch(deleteUserSuccess(_id));
        } else {
          throw new Error("Error during delete");
        }
      })
      .catch((error) => {
        console.error("Error during deleting user:", error);
      });
  };
};
