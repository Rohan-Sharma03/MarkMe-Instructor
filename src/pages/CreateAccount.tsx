import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateAccount() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signIn");
  };
  const createAccount = async () => {
    try {
      const res = await axios.get(`${process.env.API_URL}/api/getCourses`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    createAccount();
  });
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container p-6 bg-white rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-500">
          Create Account
        </h2>
        <form className="space-y-3">
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_id"
              className="text-sm font-medium text-gray-700"
            >
              Instructor ID
            </label>
            <input
              id="instructor_id"
              name="instructor_id"
              type="text"
              placeholder="Enter Instructor ID"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_name"
              className="text-sm font-medium text-gray-700"
            >
              Instructor Name
            </label>
            <input
              id="instructor_name"
              name="instructor_name"
              type="text"
              placeholder="Enter Instructor Name"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_email"
              className="text-sm font-medium text-gray-700"
            >
              Instructor Email
            </label>
            <input
              id="instructor_email"
              name="instructor_email"
              type="email"
              placeholder="Enter Instructor Email"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="ongoing_courses"
              className="text-sm font-medium text-gray-700"
            >
              Ongoing Courses
            </label>
            <input
              id="ongoing_courses"
              name="ongoing_courses"
              type="text"
              placeholder="Enter Ongoing Courses"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="contact_number"
              className="text-sm font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              id="contact_number"
              name="contact_number"
              type="tel"
              placeholder="Enter Contact Number"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="office_status"
              className="text-sm font-medium text-gray-700"
            >
              Office Status
            </label>
            <input
              id="office_status"
              name="office_status"
              type="text"
              placeholder="Enter Office Status"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-green-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 w-full focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600 text-center">
          Already have an account?
          <span
            onClick={handleSignIn}
            className="cursor-pointer text-blue-500 ml-1 hover:underline"
          >
            Sign In
          </span>
        </div>
      </div>
    </div>
  );
}
