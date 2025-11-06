// src/App.tsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import logo from "./assets/logo.png"
import React, { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

/**
 * Small typed shape for data we collect on the "Ride Details" page
 */
type RideDetailsState = {
  datetime?: string; // ISO-ish string from datetime-local
  pickup?: string;
  destination?: string;
  flightNumber?: string;
};

/**
 * Simple hook to keep a value in localStorage and in state.
 * key: localStorage key, initialValue: default
 */
function useLocalStorageState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore storage errors
    }
  }, [key, state]);

  return [state, setState] as const;
}

/**
 * Utility: inject Google Maps Places script with your API key (from env).
 * It returns a promise that resolves when google maps is ready.
 */
function loadGoogleMaps(): Promise<void> {
  // You must set VITE_GOOGLE_MAPS_API_KEY in your .env (e.g. VITE_GOOGLE_MAPS_API_KEY="YOUR_KEY")
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  if (!key) {
    return Promise.reject(
      new Error(
        "Missing VITE_GOOGLE_MAPS_API_KEY. Add it to .env and restart vite."
      )
    );
  }

  // if already loaded, resolve immediately
  if ((window as any).google?.maps?.places) return Promise.resolve();

  // if a script is already being added, wait for it
  const existing = document.querySelector<HTMLScriptElement>(
    `script[data-google-maps="1"]`
  );
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Google Maps script"))
      );
    });
  }

  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;
  script.defer = true;
  script.async = true;
  script.setAttribute("data-google-maps", "1");
  document.head.appendChild(script);

  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Google Maps script"));
  });
}

/**
 * Steps progress bar (visual helper showing current mini-page)
 */
const StepsProgress: React.FC = () => {
  const location = useLocation();
  // map routes to step index 0..3
  const map = {
    "/": 0,
    "/ride-details": 0,
    "/choose-vehicle": 1,
    "/contact-details": 2,
    "/booking-summary": 3,
  } as Record<string, number>;
  const step = map[location.pathname] ?? 0;
  const labels = ["Ride Details", "Choose a Vehicle", "Contact Details", "Booking Summary"]
const App: React.FC = () => {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", margin: "20px 0" }}>
      {labels.map((lbl, i) => (
        <div
          key={lbl}
          style={{
            padding: "12px 18px",
            borderRadius: 12,
            background: i === step ? "#333" : "#666",
            color: "white",
            minWidth: 160,
            textAlign: "center",
          }}
        >
          <div style={{ fontWeight: "700" }}>{i + 1}</div>
          <div style={{ fontSize: 13 }}>{lbl}</div>
        </div>
      ))}
    </div>
  );
};

/**
 * The RideDetails mini-page component.
 * - controlled inputs
 * - google places autocomplete wired to pickup/destination inputs
 * - saves state to localStorage via useLocalStorageState
 */
const RideDetails: React.FC = () => {
  const [data, setData] = useLocalStorageState<RideDetailsState>(
    "ride-details",
    {}
  );
  const navigate = useNavigate();

  const pickupRef = useRef<HTMLInputElement | null>(null);
  const destRef = useRef<HTMLInputElement | null>(null);

  // wire up Google Autocomplete when component mounts
  useEffect(() => {
    let pickupAutocomplete: any = null;
    let destAutocomplete: any = null;
    let cancelled = false;

    loadGoogleMaps()
      .then(() => {
        if (cancelled) return;
        const google = (window as any).google;
        if (pickupRef.current) {
          pickupAutocomplete = new google.maps.places.Autocomplete(
            pickupRef.current,
            { types: ["geocode"] }
          );
          pickupAutocomplete.addListener("place_changed", () => {
            const place = pickupAutocomplete.getPlace();
            const text = place.formatted_address || place.name || pickupRef.current?.value || "";
            setData(prev => ({ ...prev, pickup: text }));
          });
        }
        if (destRef.current) {
          destAutocomplete = new google.maps.places.Autocomplete(
            destRef.current,
            { types: ["geocode"] }
          );
          destAutocomplete.addListener("place_changed", () => {
            const place = destAutocomplete.getPlace();
            const text = place.formatted_address || place.name || destRef.current?.value || "";
            setData(prev => ({ ...prev, destination: text }));
          });
        }
      })
      .catch((e) => {
        // If Google Maps fails, we still allow typing manually.
        console.warn("Google Maps load failed:", e);
      });

    return () => {
      cancelled = true;
      // remove listeners if possible (best-effort)
      try {
        pickupAutocomplete?.unbindAll?.();
        destAutocomplete?.unbindAll?.();
      } catch {}
    };
  }, [setData]);

  // small helper to update a single field
  const setField = <K extends keyof RideDetailsState>(key: K, value: RideDetailsState[K]) =>
    setData(prev => ({ ...prev, [key]: value }));

  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <h2>Ride Details</h2>

      <label style={{ display: "block", margin: "12px 0" }}>
        Date & Time
        <input
          type="datetime-local"
          value={data.datetime ?? ""}
          onChange={(e) => setField("datetime", e.target.value)}
          style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
        />
      </label>

      <label style={{ display: "block", margin: "12px 0" }}>
        Pick-up location
        <input
          ref={pickupRef}
          placeholder="Type address or place"
          value={data.pickup ?? ""}
          onChange={(e) => setField("pickup", e.target.value)}
          style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
        />
        <small>Google Places Autocomplete will suggest addresses (if API key present).</small>
      </label>

      <label style={{ display: "block", margin: "12px 0" }}>
        Destination
        <input
          ref={destRef}
          placeholder="Type address or place"
          value={data.destination ?? ""}
          onChange={(e) => setField("destination", e.target.value)}
          style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
        />
      </label>

      <label style={{ display: "block", margin: "12px 0" }}>
        Flight number (optional)
        <input
          placeholder="e.g. AA123"
          value={data.flightNumber ?? ""}
          onChange={(e) => setField("flightNumber", e.target.value)}
          style={{ display: "block", marginTop: 6, padding: 8, width: "100%" }}
        />
      </label>

      <div style={{ marginTop: 18, display: "flex", gap: 8 }}>
        <button
          onClick={() => navigate("/choose-vehicle")}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          Next: Choose a Vehicle
        </button>

        <button
          onClick={() => {
            // Reset the fields (and localStorage) if user wants to clear
            setData({});
          }}
          style={{ padding: "10px 14px", cursor: "pointer" }}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

/**
 * Placeholder pages for the other steps.
 * Keep them simple for now; when you ask I'll implement "Choose Vehicle" next.
 */
const ChooseVehicle: React.FC = () => {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <h2>Choose a Vehicle</h2>
      <p>This is a placeholder page. We'll implement vehicle choices next.</p>
      <Link to="/contact-details">Go to Contact Details</Link>
    </div>
  );
};

const ContactDetails: React.FC = () => {
  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <h2>Contact Details</h2>
      <p>Placeholder for contact form (name, phone, email) that will also save to localStorage.</p>
      <Link to="/booking-summary">Go to Booking Summary</Link>
    </div>
  );
};

const BookingSummary: React.FC = () => {
  // read stored ride details to show a summary
  const [ride] = useLocalStorageState<RideDetailsState>("ride-details", {});
  return (
    <div style={{ maxWidth: 920, margin: "0 auto" }}>
      <h2>Booking Summary</h2>
      <pre style={{ background: "#f5f5f5", padding: 12 }}>
        {JSON.stringify(ride, null, 2)}
      </pre>
      <p>We will render this nicely later (address formatting, map, price, etc.).</p>
    </div>
  );
};

/**
 * Simple top navigation and router layout.
 */
export default function App() {
  return (
   
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black text-white shadow-md">
    
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Tiffany Towncar logo" className="h-12 w-auto" />
        </div>

        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-gray-300 transition">Blog</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300 transition">Contact Us</Link>
          </li>
        </ul>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;