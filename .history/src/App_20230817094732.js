import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://192.168.1.140:5000/data/countrydata")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setUsers(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  }, []);

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
