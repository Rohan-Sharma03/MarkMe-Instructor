import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa"; // Import the icons
import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  // const location = useLocation();

  const handleClickProfile = () => {
    navigate("/profile");
    setShowSidebar(false); // Close sidebar on profile click
  };

  const handleClickNotifier = () => {
    navigate("/notifier");
    setShowSidebar(false); // Close sidebar on notifier click
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setShowSidebar(false); // Close sidebar on page navigation
  }, [navigate]);

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", options);
    return formatter.format(today);
  };

  const currentDate = getCurrentDate();

  return (
    <div className="fixed top-0 left-0 w-full z-50  flex items-center justify-between p-3 bg-gray-100 shadow">
      <div className="flex items-center space-x-3">
        <button
          style={{ background: "none", border: "none", outline: "none" }}
          onClick={toggleSidebar}
        >
          {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        <div className="text-lg font-semibold text-gray-800">Course Name</div>
      </div>
      <div className="hidden md:block text-lg font-semibold text-gray-800">
        {currentDate}
      </div>
      <div className="flex items-center">
        <div className="text-lg font-semibold text-gray-800">
          Instructor Name
        </div>
        <FaUser
          size={20}
          onClick={handleClickProfile}
          className="ml-2 text-blue-500 cursor-pointer"
        />
      </div>

      {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-screen w-1/3 bg-white z-50 shadow-lg"
          style={{ transition: "0.5s" }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              float: "right",
              padding: "10px",
              outline: "none",
            }}
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
          <div className="p-5">
            <p className="text-lg font-bold text-gray-800">Sidebar content</p>
            <div onClick={handleClickNotifier}>
              <p className="mt-3 text-gray-700 bg-slate-400 p-2 rounded-md cursor-pointer">
                Notify Students
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
