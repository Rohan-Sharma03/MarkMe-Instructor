import React, { useState, FormEvent } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateAccount(): JSX.Element {
  const [instructorId, setInstructorId] = useState<string>("");
  const [instructorName, setInstructorName] = useState<string>("");
  const [instructorEmail, setInstructorEmail] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [instructorDesignation, setInstructorDesgination] =
    useState<string>("");

  const navigate = useNavigate();

  const handleSign = () => {
    navigate("/signIn", { replace: true });
  };
  const handleCreateAccount = () => {
    navigate(
      {
        pathname: "/credential",
        search: createSearchParams({
          email: instructorEmail,
        }).toString(),
      },
      { replace: true }
    );
  };

  const createAccount = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ciAccount`,
        {
          instructor_id: instructorId,
          instructor_name: instructorName,
          instructor_email: instructorEmail,
          contact_number: contactNumber,
          instructor_designation: instructorDesignation,
          office_status: "NA",
          ongoing_course: ["NA"],
        }
      );
      console.log(response.data); // Log the response data if needed

      // Handle success, show success message using react-toastify
      if (response.data.status === 500) {
        toast.error("Account exit already", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Account Created", {
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
      console.error("Error creating account:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !instructorId ||
      !instructorName ||
      !instructorEmail ||
      !contactNumber ||
      !instructorDesignation
    ) {
      toast.error("Please fill out all fields", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: false,
        closeButton: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return; // Prevent further execution of the form submission
    }
    createAccount();
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="container p-6 bg-white rounded-md shadow-md max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center text-blue-500">
          Create Account
        </h2>
        <form
          className="space-y-3"
          onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
        >
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_id"
              className="text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              id="instructor_id"
              name="instructor_id"
              type="text"
              value={instructorId}
              onChange={(e) => setInstructorId(e.target.value)}
              placeholder="e.g JKE00X"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_name"
              className="text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="instructor_name"
              name="instructor_name"
              type="text"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              placeholder="e.g Prof. Ramkrishanan"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="instructor_email"
              className="text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="instructor_email"
              name="instructor_email"
              type="email"
              value={instructorEmail}
              onChange={(e) => setInstructorEmail(e.target.value)}
              placeholder="e.g temp@example.com"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
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
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="e.g 8923456723"
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label
              htmlFor="designation"
              className="text-sm font-medium text-gray-700"
            >
              Job Title
            </label>
            <input
              id="designation"
              name="designation"
              type="text"
              value={instructorDesignation}
              onChange={(e) => setInstructorDesgination(e.target.value)}
              placeholder="e.g Associate Prof."
              className="py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 w-full focus:outline-none"
          >
            Create Account
          </button>
        </form>
        <div className="mt-3 text-sm text-gray-600 text-center">
          Already have an account?
          <span
            onClick={handleSign}
            className="cursor-pointer text-blue-500 ml-1 hover:underline"
          >
            Sign In
          </span>
        </div>
      </div>
      {/* Place ToastContainer at the root level */}
      <ToastContainer />
    </div>
  );
}
