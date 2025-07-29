import React from "react";
import { motion } from "framer-motion";
import { PiWebhooksLogo } from "react-icons/pi"; // Adjust if using a different package

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30 dark:bg-black/30">
      <div className="flex flex-col items-center space-y-6">
        {/* Rotating Icon */}
        <motion.div
          animate={{ rotate: [0, 90, 180, 270, 360] }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1],
          }}
        >
          {/* <PiWebhooksLogo className="text-8xl text-blue-600 drop-shadow-xl" /> */}
          <img className="h-36 w-36" src="./public/logo.svg" alt="SVG logo" />
        </motion.div>

        <div className="flex space-x-2 justify-center items-center">
          <span className="sr-only">Loading...</span>
          <div className="h-6 w-6 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="h-6 w-6 bg-black dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="h-6 w-6 bg-black dark:bg-white rounded-full animate-bounce"></div>
        </div>
      </div>
      {/* Bouncing Dots */}
    </div>
  );
};

export default Loader;
