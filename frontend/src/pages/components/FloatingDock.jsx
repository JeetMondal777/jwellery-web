// src/FloatingDockDemo.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FloatingDock from "./Dock";
import { GiLinkedRings, GiEmeraldNecklace, GiEarrings } from "react-icons/gi";
import { LiaRingSolid } from "react-icons/lia";

export function FloatingDockDemo() {
  const navigate = useNavigate();

  const categories = [
    { title: "Bangles",    icon: <GiLinkedRings />      },
    { title: "Necklace",  icon: <GiEmeraldNecklace /> },
    { title: "Earrings",   icon: <GiEarrings />        },
    { title: "Rings",      icon: <LiaRingSolid />      },
  ];

  // attach onClick to navigate to /products?category=...
  const items = categories.map((cat) => ({
    title: cat.title,
    icon: cat.icon,
    onClick: () => {
      const q = encodeURIComponent(cat.title.toLowerCase());
      navigate(`/products?category=${q}`);
    },
  }));

  return (
    <div className="h-screen flex items-center justify-center text-xl">
      <FloatingDock items={items} />
    </div>
  );
}
