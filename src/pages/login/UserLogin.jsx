import React, { useState } from "react";

import useAuthentication from "../../hooks/useAuthentication";

import { NavLink, useNavigate } from "react-router-dom";

function UserLogin() {
  
  const navigate = useNavigate();

  const {isLoading, message, userLoginCall} = useAuthentication();

  const [no, setNo] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    
    await userLoginCall({no})
  };
    
  return (
    <div className="app">
      <div className="login-form">
        <div className="title">User Log In</div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label>Tc Giriniz </label>
              <input type="text" name="username" value={no} onChange={(e) => setNo(e.target.value)} required />
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