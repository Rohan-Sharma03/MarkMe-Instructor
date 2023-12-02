import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaUser, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function NavigationBar(): JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isLoggedIn, logout, user } = useAuth();
  const [instructorName, setInstructorName] = useState<string | null>(
    "Instrcutor Name"
  );
  const navigate = useNavigate();

  const handleClickProfile = () => {
    navigate("/profile");
    setShowSidebar(false);
  };

  const handleClickAddCourse = () => {
    navigate("/addCourse");
    setShowSidebar(false);
  };

  const handleClickSignOut = () => {
    logout();
    navigate("/signIn");
    setShowSidebar(false);
  };

  const handleClickHome = () => {
    navigate("/");
    setShowSidebar(false);
  };

  const toggleSidebar = () => {
    if (isLoggedIn) {
      setShowSidebar(!showSidebar);
    }
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
    if (user) {
      setInstructorName(user.name);
    }
  }, [user]);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  useEffect(() => {
    setShowSidebar(false);
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
    <div className="fixed top-0 left-0 w-full z-50 bg-gray-800 text-white">
      <div className="flex items-center justify-between p-3 md:px-8">
        <div className="flex items-center space-x-3">
          <button
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={toggleSidebar}
          >
            {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          <div className="text-lg font-semibold">JK lakshmipath University</div>
        </div>
        <div className="hidden md:block text-lg font-semibold">
          {currentDate}
        </div>
        <div className="flex items-center space-x-3">
          <button
            style={{ background: "none", border: "none", outline: "none" }}
            onClick={handleClickHome}
          >
            <FaHome size={20} />
          </button>
          <div className="text-lg font-semibold">{instructorName}</div>
          <FaUser
            size={20}
            onClick={handleClickProfile}
            className="cursor-pointer"
          />
        </div>
      </div>

      {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-screen w-1/4 bg-white text-gray-800 shadow-lg overflow-y-auto"
        >
          <div className="p-5">
            <p className="text-lg font-bold mb-4">Menu</p>
            <div onClick={handleClickProfile}>
              <p className="mt-3 p-3 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
                Profile
              </p>
            </div>
            <div onClick={handleClickAddCourse}>
              <p className="mt-3 p-3 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
                Add Course
              </p>
            </div>
            <div onClick={handleClickSignOut}>
              <p className="mt-3 p-3 border border-gray-700 rounded-md cursor-pointer hover:bg-gray-200 transition duration-300">
                Sign Out
              </p>
            </div>
          </div>
          <div className="p-5 text-sm text-gray-600">
            <p>Version 1.0.0</p>
            <p>Made with ❤️</p>
          </div>
        </div>
      )}
    </div>
  );
}
