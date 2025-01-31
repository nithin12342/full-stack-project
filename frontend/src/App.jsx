import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import "./App.css";
import axios from "axios";

const API_URL = "http://localhost:3000/users";

const App = () => {
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(API_URL);
      console.log(data);

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const refreshView = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        refreshView();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="container">
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
      <UserForm
        editingUser={editingUser}
        setEditingUser={setEditingUser}
        onUserSaved={refreshView}
      />
    </div>
  );
};

export default App;
