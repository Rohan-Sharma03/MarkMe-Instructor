import React, { FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Credential(): JSX.Element {
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [params] = useSearchParams();
  const email = params.get("email");
  console.log("this is emial in credential", email);

  const setCred = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/iSignIn`,
        {
          people_id: email,
          people_password: repeatPassword,
          login_time: "2011-01-01 00:00:00",
        }
      );
      if (response.data.status === 500) {
        toast.error("Error creating account", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Account created sucessfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleCreateAccount();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreateAccount = () => {
    navigate("/signIn", { replace: true });
  };

  const signIn = async () => {
    try {
      // Check if passwords match before signing in
      if (newPassword !== repeatPassword) {
        toast.warning("Passwords do not match", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      // Perform your sign-in logic using Axios or any other library here
      setCred();
      console.log("Sign in logic here");
    } catch (error) {
      console.error("Error in signing in", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if any field is empty
    if (!newPassword || !repeatPassword) {
      toast.error("Please fill all the fields", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 1000,
        hideProgressBar: false,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    signIn();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Credential</h2>
        <form
          className="space-y-3"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-2">
            <label htmlFor="newPassword" className="text-sm font-medium">
              New Password
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="py-2 px-4 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="repeatPassword" className="text-sm font-medium">
              Repeat Password
            </label>
            <input
              id="repeatPassword"
              name="repeatPassword"
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              placeholder="Repeat New Password"
              className="py-2 px-4 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full"
          >
            Set Password
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
