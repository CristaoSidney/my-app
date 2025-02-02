import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const API_URL = 'https://my-app-backend-gkce.onrender.com/api/users';

export default function UserCRUD() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setUsers(data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingUser) {
      await fetch(`${API_URL}/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    }
    setFormData({ name: '', email: '' });
    setEditingUser(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email });
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">User CRUD</h1>
      <form onSubmit={handleSubmit} className="mb-4 space-y-2">
        <Input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Button type="submit">{editingUser ? 'Update User' : 'Add User'}</Button>
      </form>

      <div className="space-y-2">
        {users.map((user) => (
          <Card key={user.id} className="flex justify-between items-center p-4">
            <CardContent>
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </CardContent>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => handleEdit(user)}>Edit</Button>
              <Button variant="destructive" onClick={() => handleDelete(user.id)}>Delete</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
