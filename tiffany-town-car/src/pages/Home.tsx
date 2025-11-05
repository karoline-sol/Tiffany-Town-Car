import { useState } from "react";
import mainimg from "../assets/mainimg.png";

function Home(): JSX.Element {
  const [serviceType, setServiceType] = useState("");
  const [dateTime, setDateTime] = useState("");
  

  // 
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
          <h1 className="text-6xl md:text-5xl font-bold mb-2">
            Reservations
          </h1>
          <p className="text-xl text-gray-200">
            All Reservations At a Glance!
          </p>
        </div>
      </section>

      {/* Steps Navigation */}
      <div className="flex justify-center gap-6 py-6 bg-gray-900">
        {["Ride Details", "Choose a Vehicle", "Contact Details", "Booking Summary"].map(
          (step, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-gray-800 px-6 py-3 rounded-xl"
            >
              <span className="text-lg font-semibold mb-1">{i + 1}</span>
              <p className="text-sm text-gray-300">{step}</p>
            </div>
          )
        )}
      </div>

      {/* Reservation Form Section */}
      <section className="flex flex-col md:flex-row justify-center items-start gap-10 px-10 py-12">
        <form className="flex flex-col space-y-3 bg-gray-900 p-6 rounded-xl w-full md:w-1/3">
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="bg-black border border-gray-600 p-2 rounded text-gray-200"
          >
            <option value="">Service Type</option>
            <option value="airport">Airport Transfer</option>
            <option value="hourly">One Way Trip</option>
            <option value="hourly">Two Way Trip</option>
          </select>

          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="bg-black border border-gray-600 p-2 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Pick-up Location"
            className="bg-black border border-gray-600 p-2 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Destination"
            className="bg-black border border-gray-600 p-2 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Flight Number"
            className="bg-black border border-gray-600 p-2 rounded text-gray-200"
          />
        </form>

        {/* Map placeholder */}
        <div className="w-full md:w-1/2 h-80 rounded-xl overflow-hidden">
          <iframe
            title="Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d446293.8171977164!2d-81.62826295663226!3d28.481079475343954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e773d65ec3b66f%3A0x16cc0ff91c7e6a0a!2sOrlando%20International%20Airport!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                dignissim tincidunt.
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
    </div>
  );
}

export default Home;


