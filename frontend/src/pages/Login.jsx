import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import welcome from "../assets/images/welcome.png";

const LoginForm = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();


const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = { email, password };

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/users/login`,
      payload,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // so cookies (if any) are sent/received
      }
    );

    if (res.status === 200) {
      const { token, user } = res.data;
      console.log("Logged in user:", user);
      console.log("Token:", token);

      // persist JWT however you like (you also get it in a cookie)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
    }
  } catch (err) {
    if (err.response) {
      // invalid credentials
      console.error("Login failed:", err.response.data);
    } else {
      // network error
      console.error("Network error:", err);
    }
  }
};


  return (
    <div className="p-8 flex flex-col justify-center">
      <h2 className="text-2xl flex items-center gap-2 font-semibold mb-6 text-rose-400">
        Welcome back to{" "}
        <span className="bg-gradient-to-r from-rose-600 via-red-300 to-rose-600 animate-gradient bg-clip-text text-transparent font-bold">
          Jewels!
        </span>
        <img className="h-10 filter contrast-300 saturate-600" src={welcome} alt="" />
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          <button type="submit" className="w-full py-2 px-4 bg-rose-300 text-white font-semibold rounded-lg hover:bg-rose-400 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-rose-300">Log In</button>
          <p className="text-rose-400 mt-2 mb-20 text-center text-[12px]">Don’t have an account?{" "}
          <span className="inline-block cursor-pointer expanding-underline text-rose-500 font-semibold" onClick={onSwitchToRegister}>Sign up here!</span>
          </p>
            <p className="text-rose-400 text-[10px] text-center mt-4">
            By creating an account, I agree to{" "}
            <span className="text-rose-600 cursor-pointer">Terms of Use</span> &{" "}
            <span className="text-rose-600 cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;