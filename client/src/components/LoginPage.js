import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
// import leafs21x from '../assets/leafs2@1x.png';
// import leafs22x from '../assets/leafs2@2x.png';
// import leafs23x from '../assets/leafs2@3x.png';
// import leafs24x from '../assets/leafs2@4x.png';
// import banana1x from "../assets/banana@1x.png";
// import banana2x from "../assets/banana@2x.png";
// import banana3x from "../assets/banana@3x.png";
// import banana4x from "../assets/banana@4x.png";
// import wave1x from "../assets/wave@1x.png";
// import wave2x from "../assets/wave@2x.png";
// import wave3x from "../assets/wave@3x.png";
// import wave4x from "../assets/wave@4x.png";
// import strawberry1x from "../assets/strawberry@1x.png";
// import strawberry2x from "../assets/strawberry@2x.png";
// import strawberry3x from "../assets/strawberry@3x.png";
// import strawberry4x from "../assets/strawberry@4x.png";
// import fruitsDesktop1x from "../assets/fruits-desktop@1x.png";
// import fruitsDesktop2x from "../assets/fruits-desktop@2x.png";
// import fruitsDesktop3x from "../assets/fruits-desktop@3x.png";
// import fruitsDesktop4x from "../assets/fruits-desktop@4x.png";
import { loginUser } from "../utils/api";
import { AuthContext } from "../context/AuthContext";
// import CloseArrow from "../assets/arrow.svg";
import './LoginPage.css';

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters").required("Email is required"),
});


const LoginPage = () => {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);
  
  const handleLogin = async (values, { resetForm }) => {
    try {
      const data = await loginUser(values);
      login(data.user, data.token);
      console.log("Login success:", data);
      resetForm();
      navigate("/userpage");
    } catch (error) {
      console.error(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });
    
  return (
    <div>
      <div className="header-container-line"></div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/leafs2@1x.png`}
        srcSet={`${process.env.PUBLIC_URL}/assets/leafs2@2x.png 2x, ${process.env.PUBLIC_URL}/assets/leafs2@3x.png 3x, ${process.env.PUBLIC_URL}/assets/leafs2@4x.png 4x`}
        // src={"/slim-mom/assets/leafs2@1x.png"}
        // srcSet={`/slim-mom/assets/leafs2@2x.png 2x, /slim-mom/assets/leafs2@3x.png 3x, /slim-mom/assets/leafs2@4x.png 4x`}
        // src={leafs21x}
        // srcSet={`${leafs22x} 2x, ${leafs23x} 3x, ${leafs24x} 4x`}
        alt="leafs"
        className="leafs-image-doi"
      />

      <div className="login-container">
        {/* <img
          src={CloseArrow}
          alt="Back Arrow"
          className="back-icon"
          onClick={(e) => {
            navigate("/");
          }}
        /> */}
        <div className="login-title">Login Page</div>

        <form className="login-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email *"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
            required
          />
          {formik.touched.email && formik.errors.email && (
            <p className="error-formik">{formik.errors.email}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Password *"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
            required
          />
          {formik.touched.password && formik.errors.password && (
            <p className="error-formik">{formik.errors.password}</p>
          )}

          <div className="login-buttons">
            <button type="submit" className="cta-button-doi">
              Log in
            </button>
            <button
              type="button"
              className="cta-button-doi register"
              onClick={(e) => {
                e.preventDefault();
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        </form>

        {/* <div className="desktop-image"> */}
        <img
          src={`${process.env.PUBLIC_URL}/assets/fruits-desktop@1x.png`}
          srcSet={`${process.env.PUBLIC_URL}/assets/fruits-desktop@2x.png 2x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@3x.png 3x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@4x.png 4x`}
          // src={"/slim-mom/assets/fruits-desktop@1x.png"}
          // srcSet="/slim-mom/assets/fruits-desktop@2x.png 2x, /slim-mom/assets/fruits-desktop@3x.png 3x, /slim-mom/assets/fruits-desktop@4x.png 4x"
          // src={fruitsDesktop1x}
          // srcSet={`${fruitsDesktop2x} 2x, ${fruitsDesktop3x} 3x,${fruitsDesktop4x} 4x,`}
          alt="fruits for desktop"
          className="fruits-desktop fruit"
        />
        {/* </div> */}
        <div className="tablet-image">
          <img
            src={`${process.env.PUBLIC_URL}/assets/banana@1x.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/banana@2x.png 2x, ${process.env.PUBLIC_URL}/assets/banana@3x.png 3x, ${process.env.PUBLIC_URL}/assets/banana@4x.png 4x`}
            // src={"/slim-mom/assets/banana@1x.png"}
            // srcSet="/slim-mom/assets/banana@2x.png 2x, /slim-mom/assets/banana@3x.png 3x, /slim-mom/assets/banana@4x.png 4x"
            // src={banana1x}
            // srcSet={`${banana2x} 2x, ${banana3x} 3x, ${banana4x} 4x`}
            alt="banana"
            className="banana-image"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/wave@1x.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/wave@2x.png 2x, ${process.env.PUBLIC_URL}/assets/wave@3x.png 3x, ${process.env.PUBLIC_URL}/assets/wave@4x.png 4x`}
            // src={"/slim-mom/assets/wave@1x.png"}
            // srcSet="/slim-mom/assets/wave@2x.png 2x, /slim-mom/assets/wave@3x.png 3x, /slim-mom/assets/wave@4x.png 4x"
            // src={wave1x}
            // srcSet={`${wave2x} 2x, ${wave3x} 3x, ${wave4x} 4x`}
            alt="wave"
            className="wave-image"
          />
          <img
            src={`${process.env.PUBLIC_URL}/assets/strawberry@1x.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/strawberry@2x.png 2x, ${process.env.PUBLIC_URL}/assets/strawberry@3x.png 3x, ${process.env.PUBLIC_URL}/assets/strawberry@4x.png 4x`}
            // src={"/slim-mom/assets/strawberry@1x.png"}
            // srcSet="/slim-mom/assets/strawberry@2x.png 2x, /slim-mom/assets/strawberry@3x.png 3x, /slim-mom/assets/strawberry@4x.png 4x"
            // src={strawberry1x}
            // srcSet={`${strawberry2x} 2x, ${strawberry3x} 3x, ${strawberry4x} 4x`}
            alt="strawberry"
            className="strawberry-image"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;