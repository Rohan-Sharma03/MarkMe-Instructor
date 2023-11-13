import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QR from "./pages/QR"; // Corrected import
import NavigationBar from "./Components/NavigationBar";
import Profile from "./pages/profile";
import NewCourse from "./pages/NewCourses";
import CourseDetail from "./pages/CourseDetail";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import Notifier from "./pages/Notifier";

function App(): JSX.Element {
  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/qr" element={<QR />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/notifier" element={<Notifier />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/addCourse" element={<NewCourse />} />
          <Route path="/courseDetail" element={<CourseDetail />} />
          <Route path="/createAccount" element={<CreateAccount />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
