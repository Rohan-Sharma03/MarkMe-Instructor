import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/useAuth";
export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  // const [instructorData, setInstructorData] = useState(null);
  const [instructorId, setInstructorId] = useState<string | null>("NA");
  const [instructorName, setInstructorName] = useState<string | null>("NA");
  const [instructorEmail, setInstructorEmail] = useState<string | null>("NA");
  const [ongoingCourses, setOngoingCourses] = useState<string[]>([]);
  const [contactNumber, setContactNumber] = useState<string | null>("NA");

  useEffect(() => {
    if (user) {
      setInstructorId(user.id);
      setInstructorName(user.name);
      setInstructorEmail(user.email);
      setOngoingCourses(user.courses);
      setContactNumber(user.number);
    }
  }, [user]);

  const handleSignOut = () => {
    logout();
    navigate("/signIn", { replace: true });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="instructor_id"
            className="text-sm font-medium text-gray-700"
          >
            Instructor ID
          </label>
          <div className="py-2 px-4 border border-gray-300 rounded-md">
            {instructorId}
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
            {instructorName}
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
            {instructorEmail}
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
            {ongoingCourses.map((course, index) => (
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
            {contactNumber}
          </div>
        </div>
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md w-full"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
