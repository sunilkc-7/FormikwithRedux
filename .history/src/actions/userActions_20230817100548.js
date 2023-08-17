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

export const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersBegin());
    fetch("http://192.168.1.140:5000/data/countrydata")
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
        dispatch(fetchUsersSuccess(data));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error));
      });
  };
};
