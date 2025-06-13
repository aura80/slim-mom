import React from "react";
import "./UserPage.css";
import UserInfo from "./UserInfo";
import "./UserInfo.css";


const UserPage = () => {
    return (
      <div className="userpage-container">
        <main className="userpage-content">
          <UserInfo />
          
        </main>
      </div>
    );
};

export default UserPage;