import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import welcome from "../assets/images/welcome.png";

const RegistrationForm = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    name: `${firstName} ${lastName}`,
    email,
    password,
  };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/register`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    if (res.status === 201) {
      const { token, user } = res.data;
      console.log("Registered user:", user);
      console.log("Token:", token);

      // e.g. persist the token & redirect
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      // navigate("/dashboard");
    }
  } catch (err) {
    if (err.response) {
      // validation errors or "User already exists"
      console.error("Registration failed:", err.response.data);
    } else {
      // network / unexpected
      console.error("Network error:", err);
    }
  }
};


  return (
    <div className="p-8 flex flex-col justify-center ">
      <h2 className="text-xl mt-[-20px] flex items-center gap-2 font-semibold mb-6 text-rose-400">
        Create an account with{" "}
        <span className="bg-gradient-to-r from-rose-600 via-red-300 to-rose-600 animate-gradient bg-clip-text text-transparent font-bold">
          Jewels!
        </span>
        <img className="h-10 filter contrast-300 saturate-600" src={welcome} alt="" />
        
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-1">
            <label htmlFor="firstName" className="block text-sm font-medium text-rose-400">First Name</label>
            <input id="firstName" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="mt-1 block w-full text-rose-500 border border-rose-300 rounded-lg px-3 py-2 placeholder:text-rose-300 focus:outline-none focus:border-rose-500 hover:border-rose-400 transition-all duration-200" placeholder="John" />
          </div>
          <div className="flex-1">
            <label htmlFor="lastName" className="block text-sm font-medium text-rose-400">Last Name</label>
            <input id="lastName" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="mt-1 block w-full text-rose-500 border border-rose-300 rounded-lg px-3 py-2 placeholder:text-rose-300 focus:outline-none focus:border-rose-500 hover:border-rose-400 transition-all duration-200" placeholder="Doe" />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-rose-400">Email</label>
          <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full text-rose-500 border border-rose-300 rounded-lg px-3 py-2 placeholder:text-rose-300 focus:outline-none focus:border-rose-500 hover:border-rose-400 transition-all duration-200" placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-rose-400">Password</label>
          <div className="relative mt-1">
            <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="block w-full text-rose-500 border border-rose-300 rounded-lg px-3 py-2 pr-10 placeholder:text-rose-300 focus:outline-none focus:border-rose-500 hover:border-rose-400 transition-all duration-200" placeholder="••••••••" />
            <button type="button" onClick={() => setShowPassword((prev) => !prev)} className="absolute inset-y-0 right-0 px-3 flex items-center text-rose-400 hover:scale-102 hover:text-rose-500 focus:outline-none transition-all duration-300">
              {showPassword ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
            </button>
          </div>
        </div>
        <div>
          <button type="submit" className="w-full py-2 px-4 bg-rose-300 text-white font-semibold rounded-lg hover:bg-rose-400 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300">Register</button>
          <p className="text-rose-400 mt-2  text-center text-[12px]">Already have an account?{" "}
            <span className="inline-block cursor-pointer expanding-underline text-rose-500 font-semibold" onClick={onSwitchToLogin}>Log in</span>
          </p>
          <p className="text-rose-400 text-[10px] text-center mt-5">
            By creating an account, I agree to{" "}
            <span className="text-rose-600 cursor-pointer">Terms of Use</span> &{" "}
            <span className="text-rose-600 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;