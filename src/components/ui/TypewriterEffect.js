import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterEffect = ({ words, className = "" }) => {
  const [currentWord, setCurrentWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const word = words[currentIndex];
      if (isDeleting) {
        setCurrentWord(word.substring(0, currentWord.length - 1));
        if (currentWord === "") {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % words.length);
        }
      } else {
        setCurrentWord(word.substring(0, currentWord.length + 1));
        if (currentWord === word) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentWord, isDeleting, currentIndex, words]);

  return (
    <div className={className}>
      <span className="text-black dark:text-white">{currentWord}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-black dark:text-white"
      >
        |
      </motion.span>
    </div>
  );
};

export default TypewriterEffect;
