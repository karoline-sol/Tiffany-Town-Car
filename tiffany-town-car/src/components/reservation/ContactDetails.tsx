import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ContactDetails() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
    confirmEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem("contactDetails", JSON.stringify(formData));
    navigate("/summary");
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-3xl font-semibold mb-10">Contact Details</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
        <input name="fullName" placeholder="Full Name" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <input name="address" placeholder="Address" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <input name="email" placeholder="E-mail" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <input name="city" placeholder="City" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <input name="confirmEmail" placeholder="Confirm E-mail" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
        <select name="state" className="bg-gray-800 p-3 rounded" onChange={handleChange}>
          <option value="">State</option>
          <option value="FL">FL</option>
          <option value="CA">CA</option>
          <option value="NY">NY</option>
        </select>
        <input name="zip" placeholder="Zip Code" className="bg-gray-800 p-3 rounded" onChange={handleChange} />
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
