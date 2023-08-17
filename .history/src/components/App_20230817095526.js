import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../actions/userActions";

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            <th>Country</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.country}</td>
              <td>{user.population}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
