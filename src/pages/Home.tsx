import React, { useEffect, useState } from "react";
import CourseBox from "../Components/CourseBox";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import axios from "axios";

interface Course {
  course_id: string;
  course_name: string;
  course_objective: string;
  // Add other properties as per your API response
}

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [courses, setCourses] = useState<Course[]>([]);

  function handleClickCourse() {
    navigate("/addCourse");
  }

  const getCourse = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ciGetInstructorCourses`,
        { instructor_id: user?.id }
      );
      console.log("get course :", response.data.data);
      setCourses(response.data.data); // Set fetched courses in state
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, []);

  return (
    <div className="flex flex-col items-center p-6 mt-16">
      <h1 className="text-3xl font-bold mb-6">Ongoing Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course) => (
          <CourseBox
            key={course.course_id}
            course_id={course.course_id}
            course_name={course.course_name}
            course_objective={course.course_objective}
            // Add other necessary props as needed
          />
        ))}
      </div>
      <div className="mb-6 text-center">
        <button
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
          onClick={handleClickCourse}
        >
          Start A Course
        </button>
      </div>
    </div>
  );
};

export default Home;
