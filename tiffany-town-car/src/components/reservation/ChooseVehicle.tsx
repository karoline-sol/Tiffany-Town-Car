import { useState } from "react";
import { useNavigate } from "react-router-dom";
import towncar from "../../assets/towncar.png"
import minivan from "../../assets/minivan.png"
import suv from "../../assets/suv.png"

const vehicles = {
  "Town Car": {
    image: towncar,
    price: "$95.00",
    info: "Comfortable for 4 passengers with 2 luggage bags."
  },
  "Mini-Van": {
    image: minivan,
    price: "$120.00",
    info: "Spacious for 6 passengers with 4 luggage bags."
  },
  "SUV": {
    image: suv,
    price: "$140.00",
    info: "Premium SUV ideal for business or family travel."
  },
};

export default function ChooseVehicle() {
  const [selectedVehicle, setSelectedVehicle] = useState<string>("");
  const navigate = useNavigate();

  const handleNext = () => {
    if (selectedVehicle) {
      localStorage.setItem("selectedVehicle", selectedVehicle);
      navigate("/contact-details");
    } else {
      alert("Please select a vehicle before continuing.");
    }
  };

  const vehicle = vehicles[selectedVehicle as keyof typeof vehicles];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-3xl font-semibold mb-6">Choose Your Vehicle</h1>

      <select
        className="bg-gray-800 text-white p-3 rounded-lg mb-6 w-64 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
        value={selectedVehicle}
        onChange={(e) => setSelectedVehicle(e.target.value)}
      >
        <option value="">Select a Vehicle</option>
        {Object.keys(vehicles).map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      {vehicle && (
        <div className="text-center space-y-4 bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-md">
          <img
            src={vehicle.image}
            alt={selectedVehicle}
            className="w-full h-48 object-cover rounded-lg"
          />
          <h2 className="text-2xl font-semibold">{selectedVehicle}</h2>
          <p className="text-lg text-gray-300">{vehicle.info}</p>
          <p className="text-xl font-bold">{vehicle.price}</p>
        </div>
      )}

      <button
        onClick={handleNext}
        className="mt-8 bg-gray-200 text-black font-semibold px-6 py-2 rounded-lg hover:bg-white transition"
      >
        Next
      </button>
    </div>
  );
}
