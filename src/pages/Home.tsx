import React from "react";
import CourseBox from "../Components/CourseBox";
import { useNavigate, useSearchParams } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  // const [params] = useSearchParams();
  // const email = params.get("email");
  // console.log("this is emial in home", email);

  function handleClickCourse() {
    navigate("/addCourse");
  }

  return (
    <div className="flex flex-col items-center p-6 mt-16">
      {" "}
      {/* Added mt-16 for margin top */}
      <h1 className="text-3xl font-bold mb-6">Available Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
        <CourseBox />
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
