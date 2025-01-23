import React, { useState } from "react";
import "./app.css";

const App = () => {
  const [view, setView] = useState("home"); // State for the current view
  const [users, setUsers] = useState([
    { fullName: "Ahmad Noor", age: 25 },
    { fullName: "Yara Kamal", age: 30 },
    { fullName: "Marah Ezz", age:  15},

  ]); // Default users
  const [error, setError] = useState(""); // State for error messages

  // Function to handle adding a new user
  const handleAddUser = (user) => {
    if (!user.fullName || !user.age) {
      setError("Please fill in all fields.");
      return;
    }
    if (isNaN(user.age)) {
      setError("Age must be a number.");
      return;
    }
    setError(""); // Clear error
    setUsers([...users, user]); // Add new user to the list
    setView("home"); // Go back to the home view
  };

  // Function to render the current view
  const renderContent = () => {
    if (view === "allUsers") {
      return <AllUsers users={users} />;
    } else if (view === "addUser") {
      return <AddUserForm onAddUser={handleAddUser} />;
    } else {
      return <p>Welcome to the user information page!</p>;
    }
  };

  return (
    <div>
      <header>
        <h1>THE INFORMATION</h1>
        <div>
          <button onClick={() => setView("allUsers")}>All Users</button>
          <button onClick={() => setView("addUser")}>Add User</button>
        </div>
      </header>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {renderContent()}
    </div>
  );
};

// Component to show all users
const AllUsers = ({ users }) => {
  return (
    <div>
      <h2>All Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.fullName}</td>
                <td>{user.age}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Component to add a new user
const AddUserForm = ({ onAddUser }) => {
  const [fullName, setFullName] = useState(""); // State for the full name input
  const [age, setAge] = useState(""); // State for the age input

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onAddUser({ fullName, age }); // Call the function passed as a prop
    setFullName(""); // Clear the input field
    setAge(""); // Clear the input field
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default App;
