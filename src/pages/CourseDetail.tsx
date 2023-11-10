import React from "react";

export default function CourseDetail() {
  return (
    <div className="mt-16 px-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Course Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-2 border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Enrolled Students
          </h2>
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
          </ul>
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
            />
            <textarea
              className="w-full p-3 rounded-md border border-gray-300"
              placeholder="Message"
              rows={3}
            ></textarea>
            <button className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
