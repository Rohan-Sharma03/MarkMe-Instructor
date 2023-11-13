import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NewCourse() {
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    course_id: "",
    course_name: "",
    course_objective: "",
    instructor_id: "",
    course_for: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCreateCourse = () => {
    // Implement logic to create a new course, e.g., send data to the server
    console.log("Course Details:", courseDetails);
    // Redirect to the appropriate page after course creation
    navigate("/profile");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container p-8 bg-white rounded-md shadow-xl max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Course
        </h2>
        <form className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="course_id" className="text-sm font-medium">
              Course ID
            </label>
            <input
              id="course_id"
              name="course_id"
              type="text"
              placeholder="Enter Course ID"
              className="py-2 px-4 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="course_name" className="text-sm font-medium">
              Course Name
            </label>
            <input
              id="course_name"
              name="course_name"
              type="text"
              placeholder="Enter Course Name"
              className="py-2 px-4 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="course_objective" className="text-sm font-medium">
              Course Objective
            </label>
            <textarea
              id="course_objective"
              name="course_objective"
              placeholder="Enter Course Objective"
              className="py-2 px-4 border border-gray-300 rounded-md"
              rows={4}
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="instructor_id" className="text-sm font-medium">
              Instructor ID
            </label>
            <input
              id="instructor_id"
              name="instructor_id"
              type="text"
              placeholder="Enter Instructor ID"
              className="py-2 px-4 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="course_for" className="text-sm font-medium">
              Course For
            </label>
            <input
              id="course_for"
              name="course_for"
              type="text"
              placeholder="Enter Course For (e.g., Department)"
              className="py-2 px-4 border border-gray-300 rounded-md"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            onClick={handleCreateCourse}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300 w-full"
          >
            Create Course
          </button>
        </form>
      </div>
    </div>
  );
}
