import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const TextGenerateEffect = ({ words, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={className}>
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        transition={{ duration: 0.5 }}
      >
        {words.split(" ").map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-white"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1 },
            }}
            transition={{
              duration: 0.25,
              delay: idx * 0.1,
            }}
          >
            {word}{" "}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default TextGenerateEffect;
