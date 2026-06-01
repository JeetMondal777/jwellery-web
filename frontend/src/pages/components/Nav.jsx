import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CiUser, CiHeart, CiSearch } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { PiMicrophoneLight } from "react-icons/pi";
import { AiOutlineClose } from "react-icons/ai";
import { FaBars } from "react-icons/fa"; // Hamburger icon
import toast from "react-hot-toast";
import { Sparkles, ArrowUpRight } from "lucide-react";
import ProfilePanel from "./ProfilePanel";
import logo from "../../assets/images/logo.png";

// AuthPromptPanel component
const AuthPromptPanel = ({ onClose, type }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col items-center justify-center h-80 rounded-l-xl w-full md:w-80 bg-white shadow-lg border-l border-primary/20">
      <button
        onClick={onClose}
        className="absolute cursor-pointer top-3 right-3 text-2xl text-gray-400 hover:text-gray-600 hover:scale-110 transform transition-all duration-200"
      >
        <AiOutlineClose />
      </button>
      <h1 className="mt-6 text-xl font-headline-md text-on-surface text-center">
        You are not <span className="text-primary font-bold">logged</span> in!
      </h1>
      <p className="text-sm font-body-md mb-5 text-secondary text-center px-6">
        Please login to access your {type}.
      </p>
      <button
        onClick={() => navigate("/log")}
        className="px-6 cursor-pointer py-2 bg-primary text-on-primary font-label-caps text-[11px] rounded-full shadow-lg hover:bg-tertiary transition-all duration-200"
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
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const prevSearch = useRef("");
  const firstRun = useRef(true);
  const recognitionRef = useRef(null);

  const showDemoToast = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    toast((t) => (
      <div className="flex items-start gap-3 text-left">
        <div className="mt-0.5 text-primary">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-on-surface mb-1">Concept Flagship Feature</p>
          <p className="text-xs text-secondary leading-relaxed mb-2">
            Contents are for demo purposes only. Unlock the full feature by contacting Xanatomy.
          </p>
          <a 
            href="https://xanatomy.in" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1"
            onClick={() => toast.dismiss(t.id)}
          >
            Visit xanatomy.in <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    ), {
      position: 'bottom-right',
      duration: 6000,
      style: {
        background: '#ffffff',
        border: '1px solid #F0DFC8',
        padding: '16px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(115, 92, 0, 0.08)',
        maxWidth: '380px',
      }
    });
  };

  // Scroll handler to style navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      setListening(true);
    };
    recognition.onend = () => {
      setListening(false);
    };
    recognition.onresult = (event) => {
      let transcript = event.results[0][0].transcript || "";
      const cleaned = transcript.replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ").trim();
      setSearchTerm(cleaned);
      navigate(`/products?search=${encodeURIComponent(cleaned)}`, { replace: true });
    };
    recognition.onerror = () => {
      setListening(false);
    };
    recognition.onnomatch = () => {
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
      <nav 
        className={`fixed inset-x-0 top-0 w-full z-50 flex items-center justify-between px-4 lg:px-10 border-b border-primary/10 transition-all duration-500 bg-surface/90 backdrop-blur-xl ${
          scrolled ? "py-3 shadow-md" : "py-5"
        }`}
      >
        {/* Logo at Left */}
        <div
          onClick={() => {
            setSearchTerm("");
            navigate("/");
          }}
          className="flex justify-center cursor-pointer"
        >
          <img src={logo} alt="Logo" className="h-7 lg:h-12" />
        </div>

        {/* Navigation Links in Center */}
        <div className="hidden lg:flex items-center gap-8">
          <span 
            onClick={() => navigate("/products")}
            className={`text-label-caps font-label-caps cursor-pointer transition-colors duration-300 ${
              location.pathname === "/products" 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-secondary hover:text-primary"
            }`}
          >
            Collections
          </span>
          <span 
            onClick={() => navigate("/about")}
            className={`text-label-caps font-label-caps cursor-pointer transition-colors duration-300 ${
              location.pathname === "/about" 
                ? "text-primary border-b-2 border-primary pb-1" 
                : "text-secondary hover:text-primary"
            }`}
          >
            About Us
          </span>
          <span onClick={showDemoToast} className="text-label-caps font-label-caps text-secondary hover:text-primary cursor-pointer transition-colors duration-300">
            Boutiques
          </span>
          <span onClick={showDemoToast} className="text-label-caps font-label-caps text-secondary hover:text-primary cursor-pointer transition-colors duration-300">
            Heritage
          </span>
          <span onClick={showDemoToast} className="text-label-caps font-label-caps text-secondary hover:text-primary cursor-pointer transition-colors duration-300">
            Bridal
          </span>
          <span onClick={showDemoToast} className="text-label-caps font-label-caps text-secondary hover:text-primary cursor-pointer transition-colors duration-300">
            The World
          </span>
        </div>

        {/* Search & Icons at Right */}
        <div className="flex items-center gap-6">
          {/* Search bar inside header */}
          <div className="hidden md:flex items-center hairline-border rounded-full px-4 py-1.5 bg-surface-container-lowest/50 gap-2">
            <CiSearch
              className="text-primary text-xl cursor-pointer"
              onClick={() => {
                const q = searchTerm.trim();
                if (q) navigate(`/products?search=${encodeURIComponent(q)}`, { replace: true });
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent border-none outline-none focus:ring-0 text-xs font-body-md text-on-surface w-32 placeholder:text-outline-variant"
            />
            <PiMicrophoneLight
              className={`text-2xl p-0.5 rounded-full transition-all duration-300 cursor-pointer ${
                listening ? "text-rose-500 bg-gray-200" : "text-primary hover:bg-gray-100"
              }`}
              onClick={handleMicClick}
            />
          </div>

          {/* Desktop Icons at Right ( CiUser, CiHeart, BsHandbag ) */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex space-x-4">
              <button
                onClick={() => setShowProfile(true)}
                className="relative expanding-underline-gold cursor-pointer"
                aria-label="profile"
              >
                <CiUser className="text-2xl hover:scale-110 transition duration-200 text-[#B07F36]" />
              </button>

              <button
                onClick={() => {
                  if (!token) setShowWishlistPanel(true);
                  navigate("/wish");
                }}
                className="relative expanding-underline-gold cursor-pointer"
                aria-label="wishlist"
              >
                <CiHeart className="text-2xl hover:scale-110 transition duration-200 text-[#B07F36]" />
              </button>

              <button
                onClick={() => {
                  if (!token) setShowCartPanel(true);
                  navigate("/cart");
                }}
                className="relative expanding-underline-gold cursor-pointer"
                aria-label="cart"
              >
                <BsHandbag className="text-2xl hover:scale-110 transition duration-200 text-[#B07F36]" />
              </button>
            </div>
          </div>

          {/* Mobile Hamburger Icon */}
          <div className="relative md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl cursor-pointer text-[#B07F36]"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[60px] left-0 w-full z-50 bg-surface/95 dark:bg-surface-dim border-t border-primary/10 py-4 px-6 flex flex-col gap-4 shadow-lg animate-fade-in-up">
          <div className="flex items-center hairline-border rounded-full px-4 py-1.5 bg-surface-container-lowest/50 gap-2">
            <CiSearch className="text-primary text-lg" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="bg-transparent border-none outline-none focus:ring-0 text-xs font-body-md text-on-surface flex-grow placeholder:text-outline-variant"
            />
            <PiMicrophoneLight
              className={`text-xl cursor-pointer ${listening ? "text-rose-500" : "text-primary"}`}
              onClick={handleMicClick}
            />
          </div>

          {/* Icons row for mobile */}
          <div className="flex gap-6 justify-center py-2 border-b border-primary/5">
            <button onClick={() => { setShowProfile(true); setIsMenuOpen(false); }}>
              <CiUser className="text-2xl text-[#B07F36]" />
            </button>
            <button onClick={() => { if (!token) setShowWishlistPanel(true); navigate("/wish"); setIsMenuOpen(false); }}>
              <CiHeart className="text-2xl text-[#B07F36]" />
            </button>
            <button onClick={() => { if (!token) setShowCartPanel(true); navigate("/cart"); setIsMenuOpen(false); }}>
              <BsHandbag className="text-2xl text-[#B07F36]" />
            </button>
          </div>

          <span 
            onClick={() => { navigate("/products"); setIsMenuOpen(false); }}
            className={`text-label-caps font-label-caps cursor-pointer ${
              location.pathname === "/products" ? "text-primary font-semibold" : "text-secondary"
            }`}
          >
            Collections
          </span>
          <span 
            onClick={() => { navigate("/about"); setIsMenuOpen(false); }}
            className={`text-label-caps font-label-caps cursor-pointer ${
              location.pathname === "/about" ? "text-primary font-semibold" : "text-secondary"
            }`}
          >
            About Us
          </span>
          <span onClick={(e) => { showDemoToast(e); setIsMenuOpen(false); }} className="text-label-caps font-label-caps text-secondary cursor-pointer hover:text-primary">
            Boutiques
          </span>
          <span onClick={(e) => { showDemoToast(e); setIsMenuOpen(false); }} className="text-label-caps font-label-caps text-secondary cursor-pointer hover:text-primary">
            Heritage
          </span>
          <span onClick={(e) => { showDemoToast(e); setIsMenuOpen(false); }} className="text-label-caps font-label-caps text-secondary cursor-pointer hover:text-primary">
            Bridal
          </span>
          <span onClick={(e) => { showDemoToast(e); setIsMenuOpen(false); }} className="text-label-caps font-label-caps text-secondary cursor-pointer hover:text-primary">
            The World
          </span>
        </div>
      )}

      {/* Slide-out Panels (Drawers) */}
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
            onLogout={() => {
              localStorage.removeItem("token");
              setToken(null);
              setShowProfile(false);
              navigate("/log");
            }}
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