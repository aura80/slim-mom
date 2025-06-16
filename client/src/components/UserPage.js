import React from "react";
import { useNavigate } from "react-router-dom";
import "./UserPage.css";
import UserInfo from "./UserInfo";
import "./UserInfo.css";


const UserPage = () => {
  const navigate = useNavigate();
    return (
      <div className="userpage-container">
        <main className="userpage-content">
          <UserInfo />

        </main>
      </div>
    );
};

export default UserPage;