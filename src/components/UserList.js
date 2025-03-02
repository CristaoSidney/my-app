import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";

const API_URL = "https://my-app-backend-gkce.onrender.com/api/users";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await getAccessTokenSilently();
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    };
    fetchUsers();
  }, [getAccessTokenSilently]);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        User List
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/create"
        style={{ marginBottom: "16px" }}
      >
        Add User
      </Button>
      <Paper style={{ padding: "16px" }}>
        <List>
          {users.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemText primary={`${user.name} (${user.email})`} />
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to={`/edit/${user.id}`}
              >
                Edit
              </Button>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}