import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Check if already logged in on component mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/trackLocation", { replace: true });
    }
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password || !name) {
      setError("All fields are required!");
      return;
    }

    if (username === "admin" && password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userData", JSON.stringify({ name, username }));
      // Use window.location.href for absolute navigation to avoid routing issues
      window.location.href = "/trackLocation";
    } else {
      setError("Invalid username or password!");
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-yellow-400 text-center">
          Login
        </h2>
        <p className="text-white text-center mb-6">
          username : admin | password : admin123
        </p>

        {error && (
          <p className="text-red-400 text-center mb-4 font-medium">{error}</p>
        )}

        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 rounded-lg text-white bg-gray-700"
          />

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded-lg text-white bg-gray-700"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-lg text-white bg-gray-700"
          />

          <button
            type="submit"
            className="bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}