// src/components/FloatingDock.jsx
import React, { useState } from "react";

export default function FloatingDock({ items }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div
      onMouseLeave={() => setHoveredIdx(null)}
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2
        bg-rose-50 backdrop-blur-md border-2 border-rose-100 rounded-full
        px-4 py-2 flex items-center space-x-4
        shadow-lg z-50 transition-transform duration-300 ease-out
        ${hoveredIdx !== null ? "scale-x-110" : "scale-x-100"} scale-y-100
      `}
    >
      {items.map((item, i) => {
        let scaleClass = "scale-100";
        if (hoveredIdx === i) scaleClass = "scale-190";
        else if (hoveredIdx !== null && Math.abs(hoveredIdx - i) === 1)
          scaleClass = "scale-120";

        return (
          <div
            key={item.title}
            className="relative flex flex-col items-center overflow-visible"
          >
            {/* Tooltip */}
            <div
              className={`
                absolute bottom-full mb-9 left-1/2 transform -translate-x-1/2
                text-rose-300 font-semibold text-xs rounded-md px-2 py-1
                whitespace-nowrap z-[1000] pointer-events-none
                transition-opacity duration-200 ease-out
                ${hoveredIdx === i ? "opacity-100" : "opacity-0"}
              `}
            >
              {item.title}
            </div>

            {/* Icon button */}
            <button
              onMouseEnter={() => setHoveredIdx(i)}
              onClick={item.onClick}
              className={`
                z-[999] flex items-center justify-center
                w-12 h-12 rounded-full transition-transform duration-300 ease-out
                origin-bottom hover:bg-white/30 ${scaleClass}
              `}
            >
              {React.cloneElement(item.icon, {
                className: "text-3xl cursor-pointer text-yellow-500 rounded-full bg-rose-50 p-1",
              })}
            </button>
          </div>
        );
      })}
    </div>
  );
}
