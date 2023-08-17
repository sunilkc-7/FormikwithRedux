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
    fetch("http://192.168.1.140:5000/data/countrydata")
      .then((response) => response.json())
      .then((data) => {
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error));
      });
  };
};

export const addUser = (user) => {
  return (dispatch) => {
    fetch("http://192.168.1.140:5000/data/countrydata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Added User:", data);
        dispatch(addUserSuccess(data));
      })
      .catch((error) => {
        console.error("Error during adding user:", error);
      });
  };
};

export const updateUser = (user) => {
  return (dispatch) => {
    fetch(`http://192.168.1.140:5000/data/countrydata/${"Hello"}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated User:", data);
        dispatch(updateUserSuccess(data));
      })
      .catch((error) => {
        console.error("Error during updating user:", error);
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    fetch(`http://192.168.1.140:5000/data/countrydata/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          dispatch(deleteUserSuccess(id));
        } else {
          throw new Error("Error during delete");
        }
      })
      .catch((error) => {
        console.error("Error during deleting user:", error);
      });
  };
};
