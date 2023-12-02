import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import QR from "./pages/QR";
import NavigationBar from "./Components/NavigationBar";
import Profile from "./pages/profile";
import NewCourse from "./pages/NewCourses";
import CourseDetail from "./pages/CourseDetail";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import Notifier from "./pages/Notifier";
import Credential from "./pages/Credential";
import { AuthProvider, useAuth } from "./context/useAuth";

function App(): JSX.Element {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div>
        <NavigationBar />
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Home /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/qr"
            element={isLoggedIn ? <QR /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/signIn"
            element={!isLoggedIn ? <SignIn /> : <Navigate to="/" />}
          />
          <Route
            path="/notifier"
            element={isLoggedIn ? <Notifier /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/profile"
            element={isLoggedIn ? <Profile /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/addCourse"
            element={isLoggedIn ? <NewCourse /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/credential"
            element={isLoggedIn ? <Credential /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/courseDetail"
            element={isLoggedIn ? <CourseDetail /> : <Navigate to="/signIn" />}
          />
          <Route
            path="/createAccount"
            element={!isLoggedIn ? <CreateAccount /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

const AppWithAuthProvider: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWithAuthProvider;
