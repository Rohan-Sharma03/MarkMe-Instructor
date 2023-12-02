import React, { FormEvent, useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useAuth } from "../context/useAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        email: email,
      }).toString(),
    });
  };
  const handleCreateAccount = () => {
    navigate("/createAccount", { replace: true });
  };
  const signIn = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/iSignInDupli`,
        {
          people_id: email,
          people_password: password,
        }
      );
      console.log(response);
      if (response.data.status != 200) {
        toast.error("sign in Failed", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Sign in successful", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleSignIn();
        const userData = await fetchProfile();
        if (userData) {
          login(userData);
          handleSignIn();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/getProfile`,
        { instructor_email: email }
      );

      const facultyInfo = {
        id: res.data.data[0].instructor_id,
        name: res.data.data[0].instructor_name,
        email: res.data.data[0].instructor_email,
        courses: res.data.data[0].ongoing_course,
        number: res.data.data[0].contact_number,
      };

      return facultyInfo;
    } catch (error) {
      console.log(error);
    }
  };

  const hasReloaded = localStorage.getItem("hasReloaded");

  // If it hasn't been reloaded before, reload and set the flag
  if (!hasReloaded) {
    localStorage.setItem("hasReloaded", "true");
    window.location.reload();
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    signIn();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form
          className="space-y-3"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g temp@example.com"
              className="py-2 px-4 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="It's your Secret"
              className="py-2 px-4 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Sign In
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600 text-center">
          Don't have an account?
          <span
            onClick={handleCreateAccount}
            className="cursor-pointer text-blue-500 ml-1 hover:underline"
          >
            Create an account
          </span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
