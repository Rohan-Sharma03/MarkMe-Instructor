import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import Home from "./Home";
import QR from "./OR";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/qr" element={<QR />} />
      </Routes>
    </Router>
  );
}

export default App;
