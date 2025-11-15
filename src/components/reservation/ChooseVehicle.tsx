//ChooseVehicle.tsx 
import { useNavigate } from "react-router-dom";
import minivan from "../../assets/minivan.png";
import towncar from "../../assets/towncar.png";
import suv from "../../assets/suv.png";

export default function ChooseVehicle() {
  const navigate = useNavigate();

  // Define available vehicles with full details
  const vehicles = [
    {
      name: "Towncar",
      price: "$95.00",
      seats: 3,
      luggage: 2,
      image: towncar, // <-- replace with actual image paths
      description: "Luxury sedan perfect for business or airport travel.",
    },
    {
      name: "Minivan",
      price: "$120.00",
      seats: 5,
      luggage: 4,
      image: minivan,
      description: "Spacious and comfortable option for families or groups.",
    },
    {
      name: "SUV",
      price: "$140.00",
      seats: 6,
      luggage: 5,
      image: suv,
      description: "Premium comfort with room for luggage and extra passengers.",
    },
  ];

  // When the user selects a vehicle, store it in localStorage and navigate to contact details
  const handleSelectVehicle = (vehicle: any) => {
    localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
    navigate("/contact-details");
  };

  return (
    <div className="animate-slide-in min-h-screen bg-black text-white flex flex-col items-center px-6 py-10">
      <h1 className="text-3xl font-semibold mb-8">Choose Your Vehicle</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {vehicles.map((vehicle) => (
          <div
            key={vehicle.name}
            className="bg-gray-900 rounded-2xl shadow-lg p-5 flex flex-col items-center hover:shadow-xl hover:scale-105 transition-transform cursor-pointer"
            onClick={() => handleSelectVehicle(vehicle)}
          >
            <img
              src={vehicle.image}
              alt={vehicle.name}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{vehicle.name}</h2>
            <p className="text-gray-400 mb-2">{vehicle.description}</p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Seats:</span> {vehicle.seats}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Luggage:</span> {vehicle.luggage}
            </p>
            <p className="mt-3 text-lg font-semibold text-yellow-400">{vehicle.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
