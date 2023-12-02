import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseDetail(): JSX.Element {
  const { user } = useAuth();

  const handleNotification = () => {
    sendNotification();
  };
  const [course_id, setCourseId] = useState("CS2345");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so adding 1
  const day = currentDate.getDate();

  // Format the date as needed
  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
  console.log(formattedDate); // Output: YYYY-MM-DD format of the current date

  const sendNotification = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ciNotification`,
        {
          instructor_id: user?.id,
          course_id: course_id,
          subject: subject,
          message: message,
          date: formattedDate,
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
      }
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error, show error message to the user, etc.}
    }
  };
  return (
    <div className="mt-16 px-6 mb-7">
      <h1 className="text-3xl font-bold mb-8 text-center">Course Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Enrolled Students
          </h2>
          <div className="overflow-auto max-h-64">
            <ul className="divide-y divide-gray-300">
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
              <li className="py-2 text-gray-700">
                Rohan Sharma - 2020BTechCSE066
              </li>
            </ul>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Agenda for Class
          </h2>
          <div>
            <div className="mb-4">
              <p className="font-semibold text-gray-800">Lecture:</p>
              <ul className="list-disc list-inside pl-4 text-gray-700">
                <li>Cassandra Architecture</li>
                <li>Types of NoSQL</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Lab:</p>
              <ul className="list-disc list-inside pl-4 text-gray-700">
                <li>Cassandra Installation</li>
                <li>CQL commands</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Suggestions from Students
          </h2>
          <ul className="list-disc list-inside pl-4 text-gray-700">
            <li>PPT can be replaced for better learning</li>
            <li>Practice sheet must be provided</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Notify Students
          </h2>
          <div className="mt-4">
            <input
              className="w-full mb-4 p-3 rounded-md border border-gray-300"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <button
              onClick={handleNotification}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
