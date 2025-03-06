import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, TextField, Paper, Typography, Box } from "@mui/material";

const API_URL = "https://my-app-backend-gkce.onrender.com/api/users";

export default function UserForm() {
  const [user, setUser] = useState({ name: "", email: "" });
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (id) {
      getAccessTokenSilently().then((token) => {
        axios.get(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
          .then((response) => setUser(response.data));
      });
    }
  }, [id, getAccessTokenSilently]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const headers = { Authorization: `Bearer ${token}` };

    if (id) {
      await axios.put(`${API_URL}/${id}`, user, { headers });
    } else {
      await axios.post(API_URL, user, { headers });
    }
    navigate("/");
  };

  return (
    <Paper style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
      <Typography variant="h6" component="h2" gutterBottom>
        {id ? "Edit User" : "Create User"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={user.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={user.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate(-1)} // Volta para a página anterior
          >
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            {id ? "Update" : "Create"}
          </Button>
        </Box>        
      </form>
    </Paper>
  );
}
