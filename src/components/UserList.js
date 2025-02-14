import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import './UserList.css'; // Importe o arquivo de estilos

const API_URL = "https://my-app-backend-gkce.onrender.com/api/users";

const UserList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, );

  const fetchUsers = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;

    try {
      const token = await getAccessTokenSilently();
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
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