import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signIn");
  };

  // Sample data, replace it with actual data from your backend or state
  const facultyProfile = {
    instructor_id: "Rohan123",
    instructor_name: "Rohan",
    instructor_email: "rohan@example.com",
    ongoing_courses: ["Computer Science 101", "Mathematics 202", "Physics 301"],
    contact_number: "+1234567890",
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Faculty Profile
        </h2>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="instructor_id"
            className="text-sm font-medium text-gray-700"
          >
            Instructor ID
          </label>
          <div className="py-2 px-4 border border-gray-300 rounded-md">
            {facultyProfile.instructor_id}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="instructor_name"
            className="text-sm font-medium text-gray-700"
          >
            Instructor Name
          </label>
          <div className="py-2 px-4 border border-gray-300 rounded-md">
            {facultyProfile.instructor_name}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="instructor_email"
            className="text-sm font-medium text-gray-700"
          >
            Instructor Email
          </label>
          <div className="py-2 px-4 border border-gray-300 rounded-md">
            {facultyProfile.instructor_email}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="ongoing_courses"
            className="text-sm font-medium text-gray-700"
          >
            Ongoing Courses
          </label>
          <div className="flex flex-wrap gap-2 py-2 px-4">
            {facultyProfile.ongoing_courses.map((course, index) => (
              <span
                key={index}
                className="bg-blue-500 text-white px-2 py-1 rounded-md"
              >
                {course}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="contact_number"
            className="text-sm font-medium text-gray-700"
          >
            Contact Number
          </label>
          <div className="py-2 px-4 border border-gray-300 rounded-md">
            {facultyProfile.contact_number}
          </div>
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md w-full"
          onClick={handleLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
