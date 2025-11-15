import { useNavigate } from "react-router-dom";
import useLocalStorageState from "../../hooks/useLocalStorageState.ts";

export default function ContactDetails() {
  const navigate = useNavigate();

  // ✅ One localStorage state per field (auto-saves as user types)
  const [fullName, setFullName] = useLocalStorageState("fullName", "");
  const [address, setAddress] = useLocalStorageState("address", "");
  const [city, setCity] = useLocalStorageState("city", "");
  const [state, setState] = useLocalStorageState("state", "");
  const [zip, setZip] = useLocalStorageState("zip", "");
  const [phone, setPhone] = useLocalStorageState("phone", "");
  const [email, setEmail] = useLocalStorageState("email", "");
  const [confirmEmail, setConfirmEmail] = useLocalStorageState("confirmEmail", "");

  const handleSubmit = () => {
    // You can still store everything together if you want
    const contactDetails = {
      fullName,
      address,
      city,
      state,
      zip,
      phone,
      email,
      confirmEmail,
    };

    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
    navigate("/booking-summary");
  };

  return (
    <div className="animate-slide-in min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">Contact Details</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <input
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <input
          name="address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <input
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <input
          name="city"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <input
          name="confirmEmail"
          placeholder="Confirm E-mail"
          value={confirmEmail}
          onChange={(e) => setConfirmEmail(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
        <select
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        >
          <option value="">State</option>
          <option value="FL">FL</option>
          <option value="CA">CA</option>
          <option value="NY">NY</option>
        </select>
        <input
          name="zip"
          placeholder="Zip Code"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          className="bg-gray-800 p-3 rounded"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 bg-gray-200 text-black font-semibold px-8 py-2 rounded-lg hover:bg-white transition"
      >
        Next
      </button>
    </div>
  );
}
