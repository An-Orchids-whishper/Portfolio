import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MouseBlob = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed w-96 h-96 bg-purple-500 rounded-full opacity-30 blur-3xl pointer-events-none"
      animate={{
        x: mousePos.x - 200,
        y: mousePos.y - 200,
      }}
      transition={{
        type: "spring",
        damping: 40,
        stiffness: 100,
        restDelta: 0.001,
      }}
      style={{ zIndex: 0 }}
    />
  );
};

export default MouseBlob;
