import { useEffect, useState } from "react";

export default function BookingSummary() {
  const [rideDetails, setRideDetails] = useState<any>(null);
  const [vehicle, setVehicle] = useState<any>(null);
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    const storedRide = JSON.parse(localStorage.getItem("rideDetails") || "null");
    const selectedVehicle = JSON.parse(localStorage.getItem("selectedVehicle") || "null");
    const contactDetails = JSON.parse(localStorage.getItem("contactDetails") || "null");

    setRideDetails(storedRide);
    setVehicle(selectedVehicle);
    setContact(contactDetails);
  }, []);

  const handleConfirm = () => {
    alert("✅ Booking Confirmed!");
    localStorage.clear();
  };

  return (
    <div className="animate-slide-in min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">Booking Summary</h1>

      <div className="bg-gray-900 rounded-2xl shadow-lg p-6 w-full max-w-3xl space-y-6">
        {/* Ride Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Ride Details</h2>
          {rideDetails ? (
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium text-white">Service Type:</span> {rideDetails.serviceType}</p>
              <p><span className="font-medium text-white">Pickup:</span> {rideDetails.pickup}</p>
              <p><span className="font-medium text-white">Destination:</span> {rideDetails.destination}</p>
              <p><span className="font-medium text-white">Date/Time:</span> {rideDetails.datetime}</p>
              <p><span className="font-medium text-white">Flight Number:</span> {rideDetails.flightNumber}</p>
            </div>
          ) : (
            <p className="text-gray-500">No ride details found.</p>
          )}
        </div>

        {/* Vehicle Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Vehicle</h2>
          {vehicle ? (
            <div className="flex items-center gap-4 text-gray-300">
              {vehicle.image && (
                <img
                  src={vehicle.image}
                  alt={vehicle.name}
                  className="w-32 h-20 object-cover rounded-lg"
                />
              )}
              <div>
                <p><span className="font-medium text-white">Type:</span> {vehicle.name}</p>
                <p><span className="font-medium text-white">Seats:</span> {vehicle.seats}</p>
                <p><span className="font-medium text-white">Luggage:</span> {vehicle.luggage}</p>
                <p><span className="font-medium text-white">Price:</span> {vehicle.price}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No vehicle selected.</p>
          )}
        </div>

        {/* Contact Details */}
        <div>
          <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">Contact Details</h2>
          {contact ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-300">
              <p><span className="font-medium text-white">Full Name:</span> {contact.fullName}</p>
              <p><span className="font-medium text-white">Phone:</span> {contact.phone}</p>
              <p><span className="font-medium text-white">Address:</span> {contact.address}</p>
              <p><span className="font-medium text-white">City:</span> {contact.city}</p>
              <p><span className="font-medium text-white">State:</span> {contact.state}</p>
              <p><span className="font-medium text-white">Zip:</span> {contact.zip}</p>
              <p><span className="font-medium text-white">Email:</span> {contact.email}</p>
            </div>
          ) : (
            <p className="text-gray-500">No contact information found.</p>
          )}
        </div>
      </div>

      <button
        onClick={handleConfirm}
        className="mt-10 bg-gray-200 text-black font-semibold px-10 py-3 rounded-lg hover:bg-white transition"
      >
        Confirm Booking
      </button>
    </div>
  );
}
