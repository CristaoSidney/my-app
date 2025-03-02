import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, Typography, Container } from "@mui/material";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

export default function AppAuth() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

  return (
    <Router>
      <Container>
        <div className="flex justify-between items-center py-4">
          <Typography variant="h4" component="h1" fontWeight="bold">
            User CRUD
          </Typography>
          <div>
            {!isAuthenticated ? (
              <Button variant="contained" color="primary" onClick={() => loginWithRedirect()}>
                Login
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Typography variant="body1">Hello, {user.name}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<UserForm />} />
            <Route path="/edit/:id" element={<UserForm />} />
          </Routes>
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            Please log in to access the system.
          </Typography>
        )}
      </Container>
    </Router>
  );
}