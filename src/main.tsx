//Main.tsx is the power button of the app, it runs first
//it loads the style (tailwind)
//load google maps and google places before anything.
//start the app and enable routing
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; //let you use navigation pages in React
import App from "./App"; //load App component
import "./styles/index.css"; 

// ✅ Function to load Google Maps Load Google Maps JavaScript API before loading the app 
const loadGoogleMaps = () => {
  return new Promise<void>((resolve, reject) => {
    // (loaded once) If already loaded, skip adding script 
    if (window.google && window.google.maps) {
      resolve();
      return;
    }
console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY)
    //loading the google maps including google places so we can use Autocomplete
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
      //use below strictmode to catch error
      <React.StrictMode>
        <BrowserRouter basename="/Tiffany-Town-Car/"> 
          <App />
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch((err) => {
    console.error(err);
  });
