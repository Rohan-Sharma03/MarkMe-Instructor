import axios from "axios";
import React, { useEffect, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

type TimeTableItem = {
  association_timetable_id: string;
  days_of_week: string[];
  end_time: string[];
  period_type: string;
  start_time: string[];
  timetable_id: string;
  venue: string;
};

export default function CourseBox({
  course_id,
  course_name,
  course_objective,
}: {
  course_id: string;
  course_name: string;
  course_objective: string;
}): JSX.Element {
  const navigate = useNavigate();
  const [timeTable, setTimeTable] = useState<TimeTableItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCourseClick = () => {
    navigate({
      pathname: "/courseDetail",
      search: createSearchParams({
        course_id: course_id,
        course_name: course_name,
      }).toString(),
    });
  };

  const handleQRClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // Stop the event from propagating to the parent div
    navigate({
      pathname: "/qr",
      search: createSearchParams({
        course_id: course_id,
      }).toString(),
    });
  };

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/${course_id}/getTimeTable`
        );
        console.log("API Response:", res.data);
        setTimeTable(res.data.data || []); // Ensure setting an empty array if data is undefined
        setLoading(false);
      } catch (error) {
        console.error("Error fetching timetable:", error);
        setLoading(false);
      }
    };
    fetchTimeTable();
  }, [course_id]);

  const getDay = (): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    return days[today];
  };

  // Function to get today's class time and venue
  const getTodayClassInfo = (): { classTime: string; venue: string } | null => {
    const today = getDay();
    const todayClass = timeTable.find((item) =>
      item.days_of_week.includes(today)
    );
    if (todayClass) {
      const classTime = `${todayClass.start_time[0]} to ${todayClass.end_time[0]}`;
      const venue = todayClass.venue;
      return { classTime, venue };
    }
    return null;
  };

  // Get today's class time and venue
  const todayClassInfo = getTodayClassInfo();

  return (
    <div
      className="flex flex-col items-center justify-center h-96 w-72 bg-slate-200 rounded-lg shadow-lg p-6  cursor-pointer"
      onClick={handleCourseClick}
    >
      <div className="text-center space-y-3">
        <div className="text-2xl font-bold text-gray-800">{course_name}</div>
        {loading && <div>Loading...</div>}
        {!loading && todayClassInfo && (
          <>
            <div className="text-lg text-gray-600">
              Class Time: {todayClassInfo.classTime}
            </div>
            <div className="text-lg text-gray-600">
              Venue: {todayClassInfo.venue}
            </div>
          </>
        )}
        {!loading && !todayClassInfo && (
          <div className="text-lg text-gray-600">
            No class scheduled for today
          </div>
        )}
      </div>
      <button
        className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
        onClick={handleQRClick}
      >
        Take Attendance
      </button>
    </div>
  );
}
