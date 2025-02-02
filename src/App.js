import logo from "./logo.svg";
import "./App.css";

import { useEffect, useState } from "react";
import { supabase } from "./supabase";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    const fetchData = async () => {
      const response = await fetch(`${backendUrl}/api/data`);
      const data = await response.json();
      console.log(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      if (error) console.error("Error fetching users:", error);
      else setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        <h1>Users</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
