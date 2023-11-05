import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import the icons

export default function NavigationBar() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null); // Adjusted the type assertion

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event: Event) => {
    if (
      sidebarRef.current &&
      !(sidebarRef.current as any).contains(event.target) // Type assertion adjusted
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

  return (
    <div className="flex flex-row justify-between p-3">
      <div className="flex flex-row space-x-3">
        <div>
          <button
            style={{ background: "none", border: "none" }}
            onClick={toggleSidebar}
          >
            {showSidebar ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
          Hamburger
        </div>
        <div>box 1</div>
      </div>
      <div>box 2</div>
      <div>box 3</div>

      {showSidebar && (
        <div
          ref={sidebarRef}
          className="fixed top-0 left-0 h-screen w-1/3 bg-gray-200 z-10 shadow-lg"
          style={{ transition: "0.5s" }}
        >
          <button
            style={{
              background: "none",
              border: "none",
              float: "right",
              padding: "10px",
            }}
            onClick={toggleSidebar}
          >
            <FaTimes size={20} />
          </button>
          <div className="p-5">
            <p className="text-lg font-bold">Sidebar content</p>
            <p className="mt-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
              condimentum posuere odio, vitae volutpat mauris dignissim vel.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
