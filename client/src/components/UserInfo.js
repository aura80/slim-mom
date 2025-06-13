import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../utils/api";
// import HomePage from "../pages/HomePage";
import { apiUrl } from '../config';
import "../pages/HomePage.css";
import "./UserInfo.css";


const UserInfo = () => {
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

  const handleLogout = async () => {
    try {
      await logoutUser();  // call to backend API
      logout();   // call to frontend context
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  }

  const [year, month, day] = new Date().toISOString().slice(0, 10).split("-");

  useEffect(() => {
    if (height && weight && age && bloodGroup) {
      const fetchSummary = async () => {
        try {
          const today = new Date();
          // const date = today.toISOString().split("T")[0];
          const date = today.toISOString().slice(0, 10);
          // const [year, month, day] = date.split("-");
          const token = localStorage.getItem("token");


          const response = await fetch(
            `${apiUrl}/api/daily-intake/summary?weight=${weight}&height=${height}&age=${age}&bloodGroup=${bloodGroup}&date=${date}`,
            {
              headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
              },
            }
          );
          if (!response.ok) throw new Error("Failed to fetch summary");

          const data = await response.json();

          console.log("Result", data);
          setResult(data);
          setError(null);
        } catch (error) {
          setResult(null);
          console.error("Error fetch", error);
          setError("0000Error fetch");
        }
      };
      fetchSummary();
    } else {
      setResult(null);
      setError("0000 Nu exista");
    }      
  }, [height, weight, age, bloodGroup]);
  
  return (
    <div className="user-info">
      {user && (
        <div className="modal-user-overlay">
          <span className="username">{user.name}</span>
          <div className="vertical-user-bar"></div>
          <button className="logout-button" onClick={handleLogout}>
            Exit
          </button>
        </div>
      )}
      {/* <HomePage /> */}

      <main className="main-content desktop-position">
        <div className="form-desktop-position">
          <h1>Calculate your daily calorie intake right now</h1>
          <form className="form-container">
            <div className="form-container-tablet">
              <div className="column-left">
                <input
                  type="number"
                  placeholder="Height *"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Age *"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input-field"
                  required
                />
                <input
                  type="number"
                  placeholder="Current weight *"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              <div className="column-right">
                <input
                  type="number"
                  placeholder="Desired weight *"
                  className="input-field"
                  required
                />

                <label className="blood-type-label">Blood type *</label>
                <div className="radio-group">
                  {[1, 2, 3, 4].map((group) => (
                    <label key={group}>
                      <input
                        type="radio"
                        name="bloodType"
                        value={group}
                        checked={bloodGroup === String(group)}
                        onChange={() => setBloodGroup(String(group))}
                      />
                      <span> {group} </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="valid">
              <button
                className="cta-button tablet"
                onClick={async (e) => {
                  e.preventDefault();
                  if (isAuthenticated) {
                    // navigate("/diary");
                    // } else {
                    // calculateBmr();

                    navigate("/diary");
                  }
                }}
              >
                Start losing weight
              </button>
            </div>
          </form>
        </div>

        <div className="summary-food">
          {result && isAuthenticated && !error ? (
            <div className="summary-fo">
              {user && (
                <div className="overlay name">
                  <span className="usernm">{user.name}</span>
                  <div className="vertical-bar"></div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Exit
                  </button>
                </div>
              )}
              <div className="summary-position">
                <div className="summary-kcal">
                  <div className="summary-text">
                    Summary for{" "}
                    {result?.date
                      ? result.date.split("-").reverse().join(".")
                      : "..."}
                  </div>

                  <p className="kcal-plan txt">
                    Left
                    <span>{result?.left ?? "000"} kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    Consumed
                    <span>{result?.consumed ?? "000"} kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    Daily rate
                    <span>{result?.dailyRate ?? "000"} kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    n% of normal
                    <span>{result?.percentage ?? "000"} kcal</span>
                  </p>
                </div>

                <div className="food-kcal">
                  <div className="summary-text">Food not recommended</div>
                  <p className="kcal-plan txt">
                    Your diet will be displayed here
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="summary-fo">
              {user && (
                <div className="overlay name">
                  <span className="usernm">{user.name}</span>
                  <div className="vertical-bar"></div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Exit
                  </button>
                </div>
              )}
              <div className="summary-position">
                <div className="summary-kcal">
                  <div className="summary-text nm">
                    Summary for{" "}
                    {result?.date
                      ? result.date.split("-").reverse().join(".")
                      : `${day}.${month}.${year}`}
                  </div>

                  <p className="kcal-plan txt">
                    Left
                    <span>000 kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    Consumed
                    <span>000 kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    Daily rate
                    <span>000 kcal</span>
                  </p>
                  <p className="kcal-plan txt">
                    n% of normal
                    <span>000 kcal</span>
                  </p>
                </div>

                <div className="food-kcal">
                  <div className="summary-text">Food not recommended</div>
                  <p className="kcal-plan txt">
                    Your diet will be displayed here
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="grey-tablet-login"></div>
    </div>
  );
};

export default UserInfo;
