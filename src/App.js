import React from "react";
import "./App.css";
import Body from "./components/Body";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dayangstore" />} />
          <Route path="/dayangstore" exact element={<Body />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
