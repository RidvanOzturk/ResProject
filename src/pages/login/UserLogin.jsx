import React, { useState } from "react";

import useAuthentication from "../../hooks/useAuthentication";

import { NavLink, useNavigate } from "react-router-dom";

function UserLogin() {
  
  const navigate = useNavigate();

  const {isLoading, message, userLoginCall} = useAuthentication();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    
    await userLoginCall({username, password})
  };
    

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">User Log In</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Username </label>
              <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="button-container">
              <input type="submit" value="Enter" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;