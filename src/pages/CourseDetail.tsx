import React, { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

export default function CourseDetail(): JSX.Element {
  const { user } = useAuth();
  const [params] = useSearchParams();
  const course_id = params.get("course_id");
  const [enrolledStudents, setEnrolledStudents] = useState<any[]>([]);

  const [lecture, setLecture] = useState("");
  const [lab, setLab] = useState("");

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
        toast.error("Notif exit already", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Notification Send Succesfully", {
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

  const updateAgenda = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ciUpdateAgenda`,
        {
          lectureTopics: lecture,
          labTopics: lab,
          course_id: course_id,
        }
      );
      console.log(response.data); // Log the response data if needed

      // Handle success, show success message using react-toastify
      if (response.data.status === 404) {
        toast.error("No data found for the provided ID", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else if (response.data.status === 500) {
        toast.error("Error updating agenda:", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success("Agenda updated successfully", {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 1000,
          hideProgressBar: false,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log(response.data.data[0].labtopics);
        console.log(response.data.data[0].lecturetopics);
      }
      // Show success message or perform further actions upon successful update
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };
  useEffect(() => {
    const storedLecture = localStorage.getItem("lecture");
    const storedLab = localStorage.getItem("lab");

    if (storedLecture) {
      setLecture(storedLecture);
    }

    if (storedLab) {
      setLab(storedLab);
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Update localStorage when lecture or lab state changes
  useEffect(() => {
    localStorage.setItem("lecture", lecture);
  }, [lecture]);

  useEffect(() => {
    localStorage.setItem("lab", lab);
  }, [lab]);

  async function getEnrolledStudents(courseId: string) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/ciGetEnrolledStudents`,
        { course_id: courseId }
      );

      console.log("THIS is res", response.data.data);
      if (response.data.success) {
        return response.data.data || []; // Return the 'students' array or an empty array
      } else {
        return []; // Return an empty array if there are no enrolled students
      }
    } catch (error) {
      console.error("Error fetching enrolled students:", error);
      throw new Error("Failed to fetch enrolled students");
    }
  }

  useEffect(() => {
    // Fetch enrolled students when the component mounts
    if (course_id) {
      getEnrolledStudents(course_id).then((students) => {
        setEnrolledStudents(students);
      });
    }
  }, [course_id]);

  return (
    <div className="mt-16 px-6 mb-7">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Course Detail for {course_id}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Enrolled Students
          </h2>
          <div className="overflow-auto max-h-64">
            <ul className="divide-y divide-gray-300">
              {enrolledStudents.map((student, index) => (
                <li key={index} className="py-2 text-gray-700">
                  {`${student.student_name} - ${student.student_id}`}
                </li>
              ))}
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
                <textarea
                  className="w-full p-3 rounded-md border border-gray-300"
                  placeholder="Lecture Agenda"
                  rows={2}
                  value={lecture}
                  onChange={(e) => setLecture(e.target.value)}
                ></textarea>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-800">Lab:</p>
              <ul className="list-disc list-inside pl-4 text-gray-700">
                <textarea
                  className="w-full p-3 rounded-md border border-gray-300"
                  placeholder="Lab Agenda"
                  rows={2}
                  value={lab}
                  onChange={(e) => setLab(e.target.value)}
                ></textarea>
              </ul>
            </div>
          </div>
          <button
            onClick={updateAgenda}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-4"
          >
            Save Agenda
          </button>
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
              onClick={sendNotification}
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
