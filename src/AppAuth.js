import React from "react";
import AuthButtons from "./components/AuthButtons";
import UserList from "./components/UserList";

function AppAuth() {
  return (
    <div>
      <h1>Minha Aplicação</h1>
      <AuthButtons />
      <UserList />
    </div>
  );
}

export default AppAuth;