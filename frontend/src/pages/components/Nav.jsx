import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CiUser, CiHeart, CiSearch } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { PiMicrophoneLight } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa"; // Hamburger icon
import ProfilePanel from "./ProfilePanel";
import logo from "../../assets/images/logo.png";

// AuthPromptPanel component (unchanged)
const AuthPromptPanel = ({ onClose, type }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center h-80 rounded-l-xl w-full md:w-80 bg-white shadow-lg">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 hover:scale-110 transform transition-all duration-200"
      >
        <AiOutlineClose />
      </button>
      <h1 className="mt-6 text-xl font-semibold text-center">
        You are not <span className="text-rose-600">logged</span> in!
      </h1>
      <p className="text-sm mb-5 text-gray-500 text-center px-4">
        Please login to access your {type}.
      </p>
      <button
        onClick={() => navigate("/log")}
        className="px-6 cursor-pointer py-2 bg-gradient-to-r from-yellow-400 to-rose-400 hover:scale-105 text-white rounded-full shadow hover:bg-opacity-90 transition-all duration-200"
      >
        Login / Signup
      </button>
    </div>
  );
};

const Navbar = () => {
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const [showWishlistPanel, setShowWishlistPanel] = useState(false);
  const [showCartPanel, setShowCartPanel] = useState(false);
  const [listening, setListening] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  const navigate = useNavigate();
  const prevSearch = useRef("");
  const firstRun = useRef(true);
  const recognitionRef = useRef(null);

  // Speech Recognition setup (unchanged)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn("SpeechRecognition API not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setListening(true);
    };
    recognition.onend = () => {
      console.log("Speech recognition ended");
      setListening(false);
    };
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript || "";
      console.log("Recognized:", transcript);
      const cleaned = transcript.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
      console.log("Cleaned:", cleaned);
      setSearchTerm(cleaned);
      navigate(`/products?search=${encodeURIComponent(cleaned)}`, { replace: true });
    };
    recognition.onerror = (event) => {
      console.error("Recognition error:", event.error);
      setListening(false);
      alert("Speech recognition error: " + event.error);
    };
    recognition.onnomatch = () => {
      console.warn("Speech not recognized");
      setListening(false);
    };

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [navigate]);

  // Load token (unchanged)
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  // Navigate on search term change (unchanged)
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
    } else {
      const prev = prevSearch.current.trim();
      const curr = searchTerm.trim();

      if (curr) {
        navigate(`/products?search=${encodeURIComponent(curr)}`, { replace: true });
      } else if (prev) {
        navigate("/", { replace: true });
      }
    }
    prevSearch.current = searchTerm;
  }, [searchTerm, navigate]);

  const handleMicClick = () => {
    if (recognitionRef.current) {
      listening ? recognitionRef.current.stop() : recognitionRef.current.start();
    } else {
      alert("Speech recognition not supported in this browser.");
    }
  };

  return (
    <>
      <nav className="bg-white z-50 inset-x-0 top-0 fixed w-full flex items-center justify-between px-4 lg:px-10 py-3 shadow-lg">
        {/* Logo */}
        <div
          onClick={() => {
            setSearchTerm("");
            navigate("/");
          }}
          className="flex justify-center cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-7 lg:h-12" />
        </div>

        {/* Search */}
        <div className="flex items-center border-[1px] border-gray-200 shadow-lg px-3 mx-2 py-3 rounded-full flex-1 max-w-lg">
          <CiSearch
            className="text-[#B07F36] text-2xl mr-3 cursor-pointer"
            onClick={() => {
              const q = searchTerm.trim();
              if (q) navigate(`/products?search=${encodeURIComponent(q)}`, { replace: true });
            }}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
            className="flex-grow bg-transparent outline-none text-sm placeholder:text-rose-300 text-rose-300"
          />
          <PiMicrophoneLight
            className={`text-3xl p-1 text-[#B07F36] rounded-full transition-all duration-300 cursor-pointer ${
              listening ? "bg-gray-200" : "hover:bg-gray-100"
            }`}
            onClick={handleMicClick}
          />
        </div>

        {/* Navigation Icons */}
        <div className="relative md:hidden">
          <FaBars
            className="text-2xl cursor-pointer text-[#B07F36]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <div
            className={`absolute top-full right-0 bg-white shadow-lg flex space-x-4 p-2 rounded-lg  ${
              isMenuOpen ? "opacity-100 translate-y-0 mt-5 " : "opacity-0 -translate-y-4 pointer-events-none"
            } transition-all duration-300`}
          >
            <CiUser
              className="text-2xl cursor-pointer text-[#B07F36]"
              onClick={() => {
                setShowProfile(true);
                setIsMenuOpen(false);
              }}
            />
            <CiHeart
              className="text-2xl cursor-pointer text-[#B07F36]"
              onClick={() => {
                if (!token) setShowWishlistPanel(true);
                navigate("/wish");
                setIsMenuOpen(false);
              }}
            />
            <BsHandbag
              className="text-2xl cursor-pointer text-[#B07F36]"
              onClick={() => {
                if (!token) setShowCartPanel(true);
                navigate("/cart");
                setIsMenuOpen(false);
              }}
            />
          </div>
        </div>
        {/* Desktop Icons */}
        <div className="hidden md:flex items-center space-x-4">
          <CiUser
            onClick={() => setShowProfile(true)}
            className="text-2xl hover:scale-110 transition duration-200 cursor-pointer text-[#B07F36]"
          />
          <CiHeart
            onClick={() => {
              if (!token) setShowWishlistPanel(true);
              navigate("/wish");
            }}
            className="text-2xl hover:scale-110 transition duration-200 cursor-pointer text-[#B07F36]"
          />
          <BsHandbag
            onClick={() => {
              if (!token) setShowCartPanel(true);
              navigate("/cart");
            }}
            className="text-2xl hover:scale-110 transition duration-200 cursor-pointer text-[#B07F36]"
          />
        </div>
      </nav>

      {/* Panels */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
          showProfile ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {token ? (
          <ProfilePanel
            name="Jane Doe"
            email="jane@example.com"
            memberSince="Jan 2023"
            onLogout={() => alert("Logged out")}
            onClose={() => setShowProfile(false)}
          />
        ) : (
          <AuthPromptPanel onClose={() => setShowProfile(false)} type="profile" />
        )}
      </div>
      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
          showWishlistPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <AuthPromptPanel onClose={() => setShowWishlistPanel(false)} type="wishlist" />
      </div>
      <div
        className={`fixed top-0 right-0 h-full z-50 transform transition-transform duration-300 ${
          showCartPanel ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <AuthPromptPanel onClose={() => setShowCartPanel(false)} type="cart" />
      </div>
    </>
  );
};

export default Navbar;