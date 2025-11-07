import { Link, Routes, Route, useLocation } from "react-router-dom";
import mainimg from "../assets/mainimg.png";
import RideDetails from "../components/reservation/RideDetails";
import ChooseVehicle from "../components/reservation/ChooseVehicle";
import ContactDetails from "../components/reservation/ContactDetails";
import BookingSummary from "../components/reservation/BookingSummary";

function Home(): JSX.Element {
  const location = useLocation();

  // Step labels for the progress bar
  const steps = ["Ride Details", "Choose a Vehicle", "Contact Details", "Booking Summary"];

  // Map each path to a step index (used to highlight the current one)
  const stepIndex: Record<string, number> = {
    "/": 0,
    "/choose-vehicle": 1,
    "/contact-details": 2,
    "/booking-summary": 3,
  };

  const currentStep = stepIndex[location.pathname] ?? 0;

  return (
    <div className="bg-black text-white min-h-screen font-sans">

      {/* Hero Section */}
      <section
        className="relative flex flex-col justify-center items-center text-center py-20"
        style={{
          backgroundImage: `url(${mainimg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-opacity-50 p-10 rounded-xl">
          <h1 className="text-6xl md:text-5xl font-bold mb-2">Reservations</h1>
          <p className="text-xl text-gray-200">All Reservations At a Glance!</p>
        </div>
      </section>

      {/* Steps Navigation */}
      <div className="flex justify-center gap-6 py-6 bg-gray-900">
        {steps.map((step, i) => (
          <Link
            key={i}
            to={
              i === 0
                ? "/"
                : i === 1
                ? "/choose-vehicle"
                : i === 2
                ? "/contact-details"
                : "/booking-summary"
            }
            className={`flex flex-col items-center px-6 py-3 rounded-xl transition ${
              currentStep === i ? "bg-gray-700 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            <span className="text-lg font-semibold mb-1">{i + 1}</span>
            <p className="text-sm">{step}</p>
          </Link>
        ))}
      </div>

      {/* Reservation sub-pages (RideDetails, ChooseVehicle, etc.) */}
      <div className="px-10 py-12">
        <Routes>
          <Route path="/" element={<RideDetails />} />
          <Route path="/choose-vehicle" element={<ChooseVehicle />} />
          <Route path="/contact-details" element={<ContactDetails />} />
          <Route path="/booking-summary" element={<BookingSummary />} />
        </Routes>
      </div>

      {/* Testimonials Section */}
      <section className="text-center py-16 px-6 bg-black">
        <h2 className="text-3xl font-semibold mb-10">
          What our <span className="text-gray-300">Clients Say...</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {[
            { name: "John Smith", stars: 4 },
            { name: "Ann Johnson", stars: 5 },
            { name: "Robert G.", stars: 4 },
          ].map((client, i) => (
            <div
              key={i}
              className="bg-gray-900 text-gray-300 p-6 rounded-xl w-72 shadow-md"
            >
              <p className="text-5xl text-gray-500 mb-4">“</p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer dignissim tincidunt.
              </p>
              <h3 className="text-white font-semibold">{client.name}</h3>
              <div className="text-yellow-400 mt-2">
                {"★".repeat(client.stars)}
                {"☆".repeat(5 - client.stars)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-6 text-gray-400">
        <p>© {new Date().getFullYear()} Tiffany Towncar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
