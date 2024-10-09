import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Auth: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      navigate("/home");
    }
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post("http://localhost:8080/auth", values);

        if (response.status === 200 || response.status === 201) {
          const { username } = response.data;

          localStorage.setItem("username", username);

          toast.success(response.data.message || "Login successful!", {
            position: "top-right",
          });

          setTimeout(() => {
            navigate("/home");
          }, 1000);
        }
      } catch (error: any) {
        toast.error(
          error.response?.data?.error ||
            "Invalid credentials, please try again.",
          { position: "top-right" }
        );
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-700 via-neutral-800 to-black backdrop-blur-md relative p-6">
      <ToastContainer />

      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl space-y-6 border border-gray-700">
        <h1 className="text-4xl font-bold text-center text-gray-200 mb-6">
          <span className="text-yellow-500">Chess</span> Login
        </h1>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-300"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              className={`mt-1 block w-full px-3 py-2 bg-gray-900/80 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.username && formik.errors.username && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`mt-1 block w-full px-3 py-2 bg-gray-900/80 border border-gray-600 rounded-md shadow-sm text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out"
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
