import React, { useEffect, useState } from 'react';
import './UserList.css'; // Importe o arquivo de estilos

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('https://my-app-backend-gkce.onrender.com/api/users');
    const data = await response.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    await fetch(`https://my-app-backend-gkce.onrender.com/api/users/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button className="delete-btn" onClick={() => deleteUser(user.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;