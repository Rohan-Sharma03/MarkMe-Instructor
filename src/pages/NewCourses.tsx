import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NewCourse() {
  const navigate = useNavigate();

  const [courseDetails, setCourseDetails] = useState({
    course_id: "",
    course_name: "",
    course_objective: "",
    instructor_id: "JKE004",
    course_for: "",
    timetable_id: "CS2345L",
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

  const addCourse = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/csCourses`,
        {
          course_id: courseDetails.course_id,
          course_name: courseDetails.course_name,
          course_objective: courseDetails.course_objective,
          instructor_id: courseDetails.instructor_id,
          course_for: courseDetails.course_for,
          timetable_id: courseDetails.timetable_id,
        }
      );
      console.log(response.data); // Log the response data if needed

      // Handle success, show success message using react-toastify
      if (response.data.status == 500) {
        toast.error("Error in Creating Course", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.data.status == 409) {
        toast.error("Course already exits", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Course Created", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        handleCreateCourse();
      }
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error, show error message to the user, etc.
    }
  };

  const handleCreateCourse = () => {
    // Implement logic to create a new course, e.g., send data to the server
    console.log("Course Details:", courseDetails);
    // Redirect to the appropriate page after course creation
    navigate("/", { replace: true });
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
            onClick={addCourse}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue  -600 transition duration-300 w-full"
          >
            Create Course
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
