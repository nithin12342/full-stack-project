const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>
        Location: {user.address.city}, {user.address.state}
      </p>
      <button className="edit" onClick={() => onEdit(user)}>
        Edit
      </button>
      <button className="delete" onClick={() => onDelete(user._id)}>
        Delete
      </button>
    </div>
  );
};

export default UserItem;
