import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
//import { Loader } from "@googlemaps/js-api-loader";
import useLocalStorageState from "../../hooks/useLocalStorageState";

// 👇 Let TypeScript know Google Maps will add a global "google" object
declare const google: unknown;

/**
 * RideDetails component
 * ---------------------
 * Collects and stores:
 *  - date & time
 *  - pickup location (Google Maps Autocomplete)
 *  - destination location (Google Maps Autocomplete)
 *  - flight number (optional)
 *
 * All fields are saved to localStorage so refreshing won’t lose them.
 */
export default function RideDetails() {
  // ✅ connect inputs to localStorage
  const [dateTime, setDateTime] = useLocalStorageState("dateTime", "");
  const [pickup, setPickup] = useLocalStorageState("pickup", "");
  const [destination, setDestination] = useLocalStorageState("destination", "");
  const [flightNumber, setFlightNumber] = useLocalStorageState("flightNumber", "");

  const navigate = useNavigate();

  // 🔹 Refs let us access DOM input elements directly (for Google Autocomplete)
  const pickupRef = useRef<HTMLInputElement | null>(null);
  const destinationRef = useRef<HTMLInputElement | null>(null);

  /**
   * Load Google Maps Places Autocomplete
   * ------------------------------------
   * Runs once when the component mounts.
   * Turns the pickup & destination fields into smart autocomplete boxes.
   */
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      console.warn("⚠️ Missing Google Maps API key. Add VITE_GOOGLE_MAPS_API_KEY in your .env file.");
      return;
    }

    const loader = new Loader({
      apiKey,
      libraries: ["places"],
    });

    loader
      .load()
      .then(() => {
        if (pickupRef.current) {
          const pickupAutocomplete = new google.maps.places.Autocomplete(pickupRef.current, {
            types: ["geocode"],
          });

          pickupAutocomplete.addListener("place_changed", () => {
            const place = pickupAutocomplete.getPlace();
            setPickup(place.formatted_address || pickupRef.current?.value || "");
          });
        }

        if (destinationRef.current) {
          const destinationAutocomplete = new google.maps.places.Autocomplete(destinationRef.current, {
            types: ["geocode"],
          });

          destinationAutocomplete.addListener("place_changed", () => {
            const place = destinationAutocomplete.getPlace();
            setDestination(place.formatted_address || destinationRef.current?.value || "");
          });
        }
      })
      .catch((err) => {
        console.error("❌ Google Maps failed to load:", err);
      });
  }, [setPickup, setDestination]);

  /**
   * Handle “Next” button → go to Choose Vehicle page
   */
  const handleNext = () => {
    if (!pickup || !destination) {
      alert("Please fill in both pickup and destination locations!");
      return;
    }

    navigate("/choose-vehicle");
  };

  // --------------------------- UI ---------------------------
  return (
    <div className="bg-gray-900 text-white p-8 rounded-xl max-w-3xl mx-auto mt-10 shadow-lg ">
      <h2 className="text-2xl font-semibold mb-6">Ride Details</h2>

      <div className="space-y-4">
        {/* Date & Time */}
        <div>
          <label className="block text-sm mb-1">Date and Time</label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="bg-black border border-gray-600 p-2 rounded w-full text-gray-200"
          />
        </div>

        {/* Pickup Location */}
        <div>
          <label className="block text-sm mb-1">Pickup Location</label>
          <input
            ref={pickupRef}
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="Enter pickup location"
            className="bg-black border border-gray-600 p-2 rounded w-full text-gray-200"
          />
        </div>

        {/* Destination Location */}
        <div>
          <label className="block text-sm mb-1">Destination Location</label>
          <input
            ref={destinationRef}
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Enter destination location"
            className="bg-black border border-gray-600 p-2 rounded w-full text-gray-200"
          />
        </div>

        {/* Flight Number */}
        <div>
          <label className="block text-sm mb-1">Flight Number (optional)</label>
          <input
            type="text"
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="e.g. DL1456"
            className="bg-black border border-gray-600 p-2 rounded w-full text-gray-200"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-10 bg-gray-200 text-black font-semibold px-10 py-3 rounded-lg hover:bg-white transition"
        >
          Next: Choose Vehicle →
        </button>
      </div>
    </div>
  );
}
