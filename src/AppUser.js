import React from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

function AppUser() {
  return (
    <div className="app-container">
      <h1>User Management</h1>
      <UserForm />
      <UserList />
    </div>
  );
}

export default AppUser;