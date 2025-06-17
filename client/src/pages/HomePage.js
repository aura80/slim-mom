import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import Modal from "../components/Modal";
import Loader from "../components/Loader";
import "./HomePage.css";


const HomePage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loader.loading);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bmr, setBmr] = useState(null);

  const { isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "LOADING_START" });
    setTimeout(() => dispatch({ type: "LOADING_END" }), 1600);
  }, [dispatch]);

  const calculateBmr = () => {
    if (weight && height && age) {
      const result = 10 * weight + 6.25 * height - 5 * age - 161;
      setBmr(result);
    }
  };

  return (
    <div className="home-page">
      {loading && <Loader />}
      <div className="header-container"></div>
      <main className="main-content">
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
                <label>
                  <input
                    type="radio"
                    name="bloodType"
                    value="1"
                    defaultChecked
                  />
                  <span> 1 </span>
                </label>
                <label>
                  <input type="radio" name="bloodType" value="2" />
                  <span> 2 </span>
                </label>
                <label>
                  <input type="radio" name="bloodType" value="3" />
                  <span> 3 </span>
                </label>
                <label>
                  <input type="radio" name="bloodType" value="4" />
                  <span> 4 </span>
                </label>
              </div>
            </div>
          </div>
          <div className="valid">
            <button
              className="cta-button tablet"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthenticated) {
                  navigate("/diary");
                } else {
                  calculateBmr();
                  setIsModalOpen(true);
                }
              }}
            >
              Start losing weight
            </button>
          </div>
        </form>
      </main>
      <img
        src={`${process.env.PUBLIC_URL}/assets/fruits-desktop@1x.png`}
        srcSet={`${process.env.PUBLIC_URL}/assets/fruits-desktop@2x.png 2x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@3x.png 3x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@4x.png 4x`}
        alt="fruits for desktop"
        className="fruits-desktop"
      />
      <div className="tablet-image">
        <img
          src={`${process.env.PUBLIC_URL}/assets/leafs@1x.png`}
          srcSet={`${process.env.PUBLIC_URL}/assets/leafs@2x.png 2x, ${process.env.PUBLIC_URL}/assets/leafs@3x.png 3x, ${process.env.PUBLIC_URL}/assets/leafs@4x.png 4x`}
          alt="leafs"
          className="leafs-image"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/banana@1x.png`}
          srcSet={`${process.env.PUBLIC_URL}/assets/banana@2x.png 2x, ${process.env.PUBLIC_URL}/assets/banana@3x.png 3x, ${process.env.PUBLIC_URL}/assets/banana@4x.png 4x`}
          alt="banana"
          className="banana-image"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/wave@1x.png`}
          srcSet={`${process.env.PUBLIC_URL}/assets/wave@2x.png 2x, ${process.env.PUBLIC_URL}/assets/wave@3x.png 3x, ${process.env.PUBLIC_URL}/assets/wave@4x.png 4x`}
          alt="wave"
          className="wave-image"
        />
        <img
          src={`${process.env.PUBLIC_URL}/assets/strawberry@1x.png`}
          srcSet={`${process.env.PUBLIC_URL}/assets/strawberry@2x.png 2x, ${process.env.PUBLIC_URL}/assets/strawberry@3x.png 3x, ${process.env.PUBLIC_URL}/assets/strawberry@4x.png 4x`}
          alt="strawberry"
          className="strawberry-image"
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="intake">Your recommended daily calorie intake is</h2>
        {bmr !== null ? (
          <p className="valid">
            <strong>
              <span className="bmr">{bmr.toFixed(2)}</span> kcal
            </strong>
          </p>
        ) : (
          <p className="valid">Please enter valid values.</p>
        )}
        <div className="horizontal-line">.</div>
        <div className="modal-foods">
          <h3 className="noteat">Foods you should not eat</h3>
          <ol>
            <li>Flour products</li>
            <li>Milk</li>
            <li>Red meat</li>
            <li>Smoked meats</li>
          </ol>
        </div>
        <div className="valid btn-modal">
          <button
            className="cta-button mod"
            onClick={(e) => {
              e.preventDefault();
              navigate("/login");
            }}
          >
            Start losing weight
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;
