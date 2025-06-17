import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "../utils/api";
import "./LoginPage.css";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must have at least 6 characters")
    .required("Email is required"),
});

const handleRegister = async (values) => {
  try {
    const data = await registerUser(values);
    console.log("Register success:", data);
  } catch (error) {
    console.error(error.message);
  }
};


const RegisterPage = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleRegister,
  });

  return (
    <div>
      <div className="header-container-line"></div>
      <img
        src={`${process.env.PUBLIC_URL}/assets/leafs2@1x.png`}
        srcSet={`${process.env.PUBLIC_URL}/assets/leafs2@2x.png 2x, ${process.env.PUBLIC_URL}/assets/leafs2@3x.png 3x, ${process.env.PUBLIC_URL}/assets/leafs2@4x.png 4x`}
        alt="leafs"
        className="leafs-image-doi"
      />

      <div className="login-container">
        <div className="login-title">Register Page</div>

        <form className="login-form" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name *"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="input-field"
            required
          />
          {formik.touched.name && formik.errors.name && (
            <p className="error-formik">{formik.errors.name}</p>
          )}
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
              Register
            </button>
            <button
              type="button"
              className="cta-button-doi register"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Log in
            </button>
          </div>
        </form>

        <div className="desktop-image">
          <img
            src={`${process.env.PUBLIC_URL}/assets/fruits-desktop@1x.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/fruits-desktop@2x.png 2x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@3x.png 3x, ${process.env.PUBLIC_URL}/assets/fruits-desktop@4x.png 4x`}
            alt="fruits for desktop"
            className="fruits-desktop"
          />
        </div>
        <div className="tablet-image">
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
      </div>
    </div>
  );
};

export default RegisterPage;