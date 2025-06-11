import React, { useContext, useState, useEffect } from "react";
import { data, useNavigate } from "react-router-dom";
import "./UserPage.css";
import { AuthContext } from "../context/AuthContext";
import UserInfo from "./UserInfo";
import "./UserInfo.css";


const UserPage = () => {
    const { user, logout } = useContext(AuthContext);

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [bloodGroup, setBloodGroup] = useState("1");
    // const [date, setDate] = useState(null);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const { isAuthenticated } = useContext(AuthContext);
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