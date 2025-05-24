import React, { useState } from "react";
import { motion } from "framer-motion";
import giftBox from "../assets/images/giftbox.png";
import background from "../assets/images/background.png";
import LoginForm from "./Login";
import RegistrationForm from "./Registration";

export default function AuthModal() {
  const [activeForm, setActiveForm] = useState("login");

  const handleFormSwitch = (form) => {
    setActiveForm(form);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm" style={{ backgroundImage: `url(${background})` }}>
      <div className="bg-rose-50 rounded-2xl shadow-2xl max-w-md lg:max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 overflow-hidden relative mx-4">
        {/* Sliding Giftbox Photo - Hidden on mobile */}
        <motion.div 
          className="hidden lg:block absolute top-0 h-full w-1/2 z-50 bg-rose-50"
          initial={false}
          animate={{ x: activeForm === "login" ? "100%" : "0%" }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.5 }}
        >
          <img src={giftBox} alt="Auth Illustration" className="object-cover h-full w-full" />
        </motion.div>

        {/* Login Form */}
        <div className={`p-4 lg:p-8 flex flex-col justify-center ${activeForm === "login" ? "block" : "hidden"} lg:block lg:z-10`}>
          <LoginForm onSwitchToRegister={() => handleFormSwitch("register")} />
        </div>

        {/* Registration Form */}
        <div className={`p-4 lg:p-8 flex flex-col justify-center ${activeForm === "register" ? "block" : "hidden"} lg:block lg:z-10`}>
          <RegistrationForm onSwitchToLogin={() => handleFormSwitch("login")} />
        </div>
      </div>
    </div>
  );
}