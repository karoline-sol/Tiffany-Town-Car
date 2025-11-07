import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import logo from "./assets/logo.png";

const App: React.FC = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-black text-white shadow-md">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Tiffany Towncar logo" className="h-12 w-auto" />
        </div>

        <ul className="flex space-x-8 text-sm font-medium">
          <li>
            <Link to="/" className="hover:text-gray-300 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blog" className="hover:text-gray-300 transition">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-300 transition">
              Contact Us
            </Link>
          </li>
        </ul>
      </nav>

      {/* Page routes */}
      <Routes>
        <Route path="/*" element={<Home />} /> {/* Home includes nested steps */}
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
