import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl } from "../config";
import localList from "../products.json";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../utils/api";
import "../pages/HomePage.css";
import "./UserInfo.css";
import "./DiaryPage.css";


const DiaryPage = () => {
  const [entryDate, setEntryDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [productId, setProductId] = useState(localList[0]?._id.$oid || "");
  const [quantity, setQuantity] = useState("");
  const [dailyEntry, setDailyEntry] = useState(null);

  
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  
  const height = params.get("height");
  const weight = params.get("weight");
  const age = params.get("age");
  const bloodGroup = params.get("bloodGroup");
  console.log(
    "height:",
    height,
    "weight:",
    weight,
    "age:",
    age,
    "bloodGroup:",
    bloodGroup
  );

  const [result, setResult] = useState(null);
  const { user, logout } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);

  const [error, setError] = useState(null);

  const navigate = useNavigate();


  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });   // anti back
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    try {
      logoutUser(); // call to backend API
      logout(); // call to frontend context
    } catch (error) {
      console.error("Logout failed: ", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setError("You must be logged in");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/api/journal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : undefined,
        },
        body: JSON.stringify({
          date: entryDate,
          productId: productId,
          quantity: quantity,
        }),
      });

      if (!response.ok)
        throw new Error("Failed to create daily entry in diary");

      const data = await response.json();
      console.log("*************API response:", data);
      setDailyEntry(data.dailyEntry);
      setError(null);
      setQuantity("");
      setProductId("");
    } catch (error) {
      setError(error.message);
      setDailyEntry(null);
    }
  };

  const handleRemoveProduct = async (consumedProductId, date) => {
    try {
      const token = localStorage.getItem("token");

      const params = new URLSearchParams({consumedProductId, date})

      const response = await fetch(
        `${apiUrl}/api/daily-intake/remove-product?${params.toString()}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to remove product");
      }

      const data = await response.json();

      setDailyEntry(data.dailyEntry);
      setError(null);
    } catch (error) {
      setError(`--> ${error.message}`);
    }
  };

  const findProduct = (id) =>
    localList.find((product) => product._id.$oid === id);

  useEffect(() => {
    if (height && weight && age && bloodGroup) {
      const fetchSummary = async () => {
        try {
          const today = new Date();
          const date = today.toISOString().slice(0, 10);
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
          // console.error("Error fetch", error);
        }
      };
      fetchSummary();
    } else {
      setResult(null);
      // setError("0000 Nu exista");
    }
  }, [height, weight, age, bloodGroup]);

  useEffect(() => {
    if (dailyEntry) {
      console.log("dailyEntry updated:", dailyEntry);
    }
  }, [dailyEntry]);

  const totalConsumedKcal =
    dailyEntry?.consumedProducts.reduce((sum, p) => {
      const product = findProduct(p.productId);
      const kcal = product
        ? Math.round((product.calories * p.quantity) / product.weight)
        : 0;
      return sum + kcal;
  }, 0) ?? 0;

  return (
    <div>
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

        <main className="main-content desktop-position">
          <div className="form-desktop-position diaryview">
            <div className="diary-view">
              <form onSubmit={handleSubmit} className="diary-form">
                <label>
                  <input
                    type="date"
                    value={entryDate}
                    onChange={(e) => setEntryDate(e.target.value)}
                    className="diary-date"
                    required
                  ></input>
                </label>

                <div className="diary-choose">
                  <label>
                    <select
                      value={productId}
                      onChange={(e) => setProductId(e.target.value)}
                      className="diary-select"
                      required
                    >
                      <option value="" disabled>
                        Enter product name
                      </option>
                      {localList.map((prod) => (
                        <option key={prod._id.$oid} value={prod._id.$oid}>
                          {prod.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
                      placeholder="Grams"
                      onChange={(e) =>
                        setQuantity(
                          e.target.value === "" ? "" : Number(e.target.value)
                        )
                      }
                      className="diary-select grams"
                      required
                    ></input>
                  </label>
                  <button type="submit" className="diary-plus-btn">
                    +
                  </button>
                </div>
              </form>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {dailyEntry?.consumedProducts?.length > 0 && (
                // <div>
                <div className="diary-grid">
                  {dailyEntry?.consumedProducts.map((p) => {
                    const product = findProduct(p.productId);
                    const kcal = product
                      ? Math.round(
                          (product.calories * p.quantity) / product.weight
                        )
                      : "No kcal";
                    return (
                      <div key={p._id} className="diary-row">
                        <div className="diary-cell title-elem">
                          {product ? product.title : "Unknown product"}
                        </div>
                        <div className="diary-cell gram-elem">100 g</div>
                        <div className="diary-cell kcal-elem">{kcal} kcal</div>
                        <div>
                          <button
                            className="diary-x"
                            onClick={() =>
                              handleRemoveProduct(p._id, dailyEntry.date)
                            }
                          >
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                // </div>
              )}
            </div>
          </div>

          <div className="summary-food">
            {dailyEntry?.consumedProducts?.length > 0 &&
            isAuthenticated &&
            !error ? (
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
                      {entryDate
                        ? entryDate.split("-").reverse().join(".")
                        : "..."}
                    </div>

                    <p className="kcal-plan txt">
                      Left
                      <span>
                        {(result?.dailyRate ?? 0) - totalConsumedKcal ?? "000"}{" "}
                        kcal
                      </span>
                    </p>
                    <p className="kcal-plan txt">
                      Consumed
                      <span>{totalConsumedKcal} kcal</span>
                    </p>
                    <p className="kcal-plan txt">
                      Daily rate
                      <span>{result?.dailyRate ?? "000"} kcal</span>
                    </p>
                    <p className="kcal-plan txt">
                      n% of normal
                      <span>
                        {result?.dailyRate
                          ? Math.round(
                              (totalConsumedKcal * 100) / result.dailyRate
                            )
                          : "0"}{" "}
                        %
                      </span>
                    </p>
                  </div>

                  <div className="food-kcal">
                    <div className="summary-text">Food not recommended</div>
                    <span className="kcal-plan txt">
                      <span className="not-rec">
                        {Array.isArray(result?.restrictedProducts) &&
                        result?.restrictedProducts.length > 0 ? (
                          result.restrictedProducts.map((product, index) => (
                            <span key={index}>{product.title}</span>
                          ))
                        ) : (
                          <span>000</span>
                        )}
                      </span>
                    </span>
                  </div>
                </div>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/diary-leafs@1x.png`}
                  srcSet={`${process.env.PUBLIC_URL}/assets/diary-leafs@2x.png 2x, ${process.env.PUBLIC_URL}/assets/diary-leafs@3x.png 3x`}
                  alt="desktop leafs"
                  className="desktop-leafs"
                />
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
                      {entryDate
                        ? entryDate.split("-").reverse().join(".")
                        : "..."}
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
                      <span>000 %</span>
                    </p>
                  </div>

                  <div className="food-kcal">
                    <div className="summary-text">Food not recommended</div>
                    <p className="kcal-plan txt">
                      Your diet will be displayed here
                    </p>
                  </div>
                </div>

                <img
                  src={`${process.env.PUBLIC_URL}/assets/diary-leafs@1x.png`}
                  srcSet={`${process.env.PUBLIC_URL}/assets/diary-leafs@2x.png 2x, ${process.env.PUBLIC_URL}/assets/diary-leafs@3x.png 3x`}
                  alt="desktop leafs"
                  className="desktop-leafs"
                />
                <img
                  src={`${process.env.PUBLIC_URL}/assets/diary-tablet-leafs@1x.png`}
                  srcSet={`${process.env.PUBLIC_URL}/assets/diary-tablet-leafs@2x.png 2x, ${process.env.PUBLIC_URL}/assets/diary-tablet-leafs@3x.png 3x`}
                  alt="desktop leafs"
                  className="desktop-tablet-leafs"
                />
              </div>
            )}
          </div>
        </main>
        <div className="grey-tablet-login"></div>
      </div>
    </div>
  );
};

export default DiaryPage;
