import React from "react";

const Contact: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-300 mb-8">Please fill out the form below.</p>

      <form className="bg-gray-800 p-6 rounded-xl w-80 flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="p-2 rounded bg-black border border-gray-600 text-white"
        />
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-black border border-gray-600 text-white"
        />
        <textarea
          placeholder="Message"
          className="p-2 rounded bg-black border border-gray-600 text-white"
          rows={4}
        ></textarea>
        <button className="bg-white text-black font-semibold py-2 rounded hover:bg-gray-200 transition">
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;

