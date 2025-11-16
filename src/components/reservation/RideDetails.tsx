//useState: Store data - useRef: direct access to inputs - useEffect:run code when component loads
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorageState from "../../hooks/useLocalStorageState.ts";


//This defines the component and allows other files to import it.
export default function RideDetails() {
  //Creates a function that lets you navigate to another page.
  const navigate = useNavigate();

  //React state variables
  const [pickup, setPickup] = useLocalStorageState("pickup", "");
  const [destination, setDestination] = useLocalStorageState("destination", "");
  const [datetime, setDatetime] = useLocalStorageState("datetime", "");
  const [serviceType, setServiceType] = useLocalStorageState("serviceType", "One Way");

  //5. Input references for Google Autocomplete
  const pickupRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  // ✅ Initialize Google Places Autocomplete using global "google"
  useEffect(() => {
    function initAutocomplete() {
      //Check if Google script and API is ready
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("❌ Google Maps Places API not ready.");
        return;
      }

      // Pickup autocomplete
      if (pickupRef.current) {
        const pickupAutocomplete = new window.google.maps.places.Autocomplete(pickupRef.current, {
          types: ["geocode"],
        });
        pickupAutocomplete.addListener("place_changed", () => {
          const place = pickupAutocomplete.getPlace();
          if (place.formatted_address) setPickup(place.formatted_address);
        });
      }

      // Destination autocomplete
      if (destinationRef.current) {
        const destinationAutocomplete = new window.google.maps.places.Autocomplete(destinationRef.current, {
          types: ["geocode"],
        });
        destinationAutocomplete.addListener("place_changed", () => {
          const place = destinationAutocomplete.getPlace();
          if (place.formatted_address) setDestination(place.formatted_address);
        });
      }
    }

    // Wait a little in case script is still loading
    const timeout = setTimeout(initAutocomplete, 500);
    return () => clearTimeout(timeout);
  }, []);

  // ✅ Load saved data from local storage if user goes back
  useEffect(() => {
    const savedRide = localStorage.getItem("rideDetails");
    if (savedRide) {
      const data = JSON.parse(savedRide);
      setPickup(data?.pickup || "");
      setDestination(data?.destination || "");
      setDatetime(data?.datetime || "");
      setServiceType(data?.serviceType || "One Way");
    }
  }, []);

  // ✅ Save and go next button
  const handleNext = () => {
    //Get the most updated input values
    const currentPickup = pickupRef.current?.value || pickup;
    const currentDestination = destinationRef.current?.value || destination;

    if (!currentPickup || !currentDestination || !datetime) {
      alert("Please fill all required fields before continuing.");
      return;
    }
//Saves the info so next page can read it.
    const rideData = {
      serviceType,
      pickup: currentPickup,
      destination: currentDestination,
      datetime,
    };

    localStorage.setItem("rideDetails", JSON.stringify(rideData));

    //Navigate user to the Choose Vehicle page.
    navigate("/choose-vehicle");
  };

  return (
    <div className="animate-slide-in min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Ride Details</h1>

      <div className="flex flex-col gap-4 w-full max-w-lg">
        {/* Service Type */}
        <select
          className="bg-gray-800 p-3 rounded"
          value={serviceType}
          onChange={(e) => setServiceType(e.target.value)}
        >
          <option value="One Way">One Way</option>
          <option value="Round Trip">Round Trip</option>
          <option value="Hourly">Hourly</option>
        </select>

        {/* Pickup Location */}
        <input
          ref={pickupRef}
          type="text"
          placeholder="Pickup Location"
          className="bg-gray-800 p-3 rounded"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
        />

        {/* Destination Location */}
        <input
          ref={destinationRef}
          type="text"
          placeholder="Destination Location"
          className="bg-gray-800 p-3 rounded"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        {/* Date & Time */}
        <input
          type="datetime-local"
          className="bg-gray-800 p-3 rounded"
          value={datetime}
          onChange={(e) => setDatetime(e.target.value)}
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="mt-6 bg-gray-200 text-black font-semibold px-8 py-2 rounded-lg hover:bg-white transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
