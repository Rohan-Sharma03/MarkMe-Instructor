import React from "react";
import CourseBox from "./Components/CourseBox";

const Home = () => {
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
    </div>
  );
};

export default Home;
