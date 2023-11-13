import React from "react";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/createAccount");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Sign In</h2>
        <form className="space-y-3">
          <div className="flex flex-col space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
    </div>
  );
}
