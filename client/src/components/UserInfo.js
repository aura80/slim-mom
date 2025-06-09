import React from "react";
import "./UserInfo.css";

const UserInfo = ({ user }) => {
  return (
    <div className="user-info">
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button className="logout-button">Logout</button>
        </>
      ) : null}
    </div>
  );
};

export default UserInfo;
