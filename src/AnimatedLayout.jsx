import React, { useState } from "react";
import { useLocation, useOutlet } from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";

// Helper component to freeze the unmounting page during fade-out
const AnimatedOutlet = () => {
  const currentOutlet = useOutlet();
  const [frozenOutlet] = useState(currentOutlet); 
  return <>{frozenOutlet}</>;
};

// Main layout component handling the WhatsApp-style zoom-fade transition
const AnimatedLayout = () => {
  const location = useLocation();

  const pageVariants = {
    initial: { 
      opacity: 0, 
      scale: 0.95 
    },
    animate: { 
      opacity: 1, 
      scale: 1 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95 
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={{ ease: "easeOut", duration: 0.4 }}
        style={{ width: "100%", height: "100%" }}
      >
        <AnimatedOutlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedLayout;