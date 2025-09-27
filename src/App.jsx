import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import TrackLocation from "./components/TrackLocation";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={isLoggedIn ? <Navigate to="/trackLocation" replace /> : <Login />} 
        />
        <Route
          path="/trackLocation"
          element={isLoggedIn ? <TrackLocation /> : <Navigate to="/" replace />}
        />
        {/* Catch-all route - redirect based on auth status */}
        <Route 
          path="*" 
          element={<Navigate to={isLoggedIn ? "/trackLocation" : "/"} replace />} 
        />
      </Routes>
    </Router>
  );
}