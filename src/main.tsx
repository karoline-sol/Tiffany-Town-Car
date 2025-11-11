import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/index.css";

// ✅ Function to load Google Maps JavaScript API
const loadGoogleMaps = () => {
  return new Promise<void>((resolve, reject) => {
    // If already loaded, skip adding script
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });
};

// ✅ Load Google Maps first, then render the app
loadGoogleMaps()
  .then(() => {
    ReactDOM.createRoot(document.getElementById("root")!).render(
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error(err);
  });
