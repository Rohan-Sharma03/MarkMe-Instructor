import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa"; // Import the icons
import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function NavigationBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

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
        <Link to="/profile">
          <FaUser size={20} className="ml-2 text-blue-500 cursor-pointer" />
        </Link>
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
            <p className="mt-3 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              condimentum posuere odio, vitae volutpat mauris dignissim vel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
