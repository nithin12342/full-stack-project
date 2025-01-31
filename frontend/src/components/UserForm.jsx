import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/users";

const UserForm = ({ editingUser, setEditingUser, onUserSaved }) => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    address: { city: "", state: "" },
  });

  useEffect(() => {
    if (editingUser) setUser(editingUser);
  }, [editingUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "state") {
      setUser({ ...user, address: { ...user.address, [name]: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await axios.put(`${API_URL}/${editingUser._id}`, user);
      } else {
        await axios.post(API_URL, user);
      }
      setUser({
        fname: "",
        lname: "",
        email: "",
        mobile: "",
        address: { city: "", state: "" },
      });
      setEditingUser(null);
      onUserSaved();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <div className="user-form">
      <h2>{editingUser ? "Edit User" : "Create User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          value={user.fname}
          onChange={handleChange}
          placeholder="FirstName"
        />
        <input
          type="text"
          name="lname"
          value={user.lname}
          onChange={handleChange}
          placeholder="LastName"
        />
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="number"
          name="mobile"
          value={user.mobile}
          onChange={handleChange}
          placeholder="Mobile"
        />
        <input
          type="text"
          name="city"
          value={user.address.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          type="text"
          name="state"
          value={user.address.state}
          onChange={handleChange}
          placeholder="State"
        />
        <button type="submit" className="create">
          {editingUser ? "Update" : "Create"} User
        </button>
        <button
          type="button"
          className="clear"
          onClick={() => setEditingUser(null)}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default UserForm;
