import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { AiOutlineInfoCircle } from "react-icons/ai";

const QR = () => {
  const navigate = useNavigate();
  const [liveAttendance, setLiveAttendance] = useState([
    { name: "Student 1", rollNumber: "A101" },
    { name: "Student 2", rollNumber: "A102" },
    { name: "Student 3", rollNumber: "A103" },
  ]);

  const handleBack = () => {
    navigate("/");
  };

  const fetchNewAttendance = () => {
    const newAttendance = [
      { name: "New Student 1", rollNumber: "A104" },
      { name: "New Student 2", rollNumber: "A105" },
    ];
    setLiveAttendance((prevAttendance) => [
      ...newAttendance,
      ...prevAttendance,
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchNewAttendance();
    }, 3000);

    return () => clearInterval(interval);
  }, [liveAttendance]);

  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <article className="max-w-screen-lg w-full p-8 bg-white rounded-lg shadow-lg flex">
        <div className="w-1/2 p-4">
          <h1 className="text-3xl font-bold mb-4 underline">
            Total Strength: {liveAttendance.length}
          </h1>
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">QR Code</h2>
            <QRCode
              size={400}
              value={"Rohan"}
              className="w-full h-auto border"
            />
          </div>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold mb-4">Live Attendance</h2>
            <div className="max-h-96 overflow-auto">
              <ul>
                {liveAttendance.map((student, index) => (
                  <li
                    key={index}
                    className="mb-3 text-lg flex items-center border-b pb-2"
                  >
                    <span className="font-semibold mr-2">{student.name}</span>
                    <span className="text-gray-500 mr-2">
                      ({student.rollNumber})
                    </span>
                    <AiOutlineInfoCircle
                      size={18}
                      className="text-gray-500 cursor-pointer"
                      title={`More info about ${student.name}`}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center">
            <button
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
              onClick={handleBack}
            >
              Close Attendance
            </button>
          </div>
        </div>
      </article>
    </section>
  );
};

export default QR;
