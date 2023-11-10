import React from "react";
import { useNavigate } from "react-router-dom";

const CourseBox: React.FC = () => {
  const navigate = useNavigate();

  const handleCourseClick = () => {
    navigate("/courseDetail");
  };

  const handleQRClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop the event from propagating to the parent div
    navigate("/qr");
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-96 w-72 bg-slate-200 rounded-lg shadow-lg p-6  cursor-pointer"
      onClick={handleCourseClick}
    >
      <div className="text-center space-y-3">
        <div className="text-2xl font-bold text-gray-800">Course Name</div>
        <div className="text-lg text-gray-600">
          Class Time: 9:00 AM to 10:00 AM
        </div>
        <div className="text-lg text-gray-600">Venue: EB2 202</div>
      </div>

      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        onClick={handleQRClick}
      >
        Take Attendance
      </button>
    </div>
  );
};

export default CourseBox;
