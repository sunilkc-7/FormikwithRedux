import React, { useState, useEffect } from "react";

const App = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // fetch("https://jsonplaceholder.typicode.com/todos/1")
    //   .then((response) => console.log(response))
    //   .then((json) => console.log(json))
    //   .catch((err) => {
    //     console.log({ err });
    //   });
    fetch("http://192.168.1.140:5000/data/countrydata")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  }, []);
  return <div>Hello</div>;
};
export default App;
