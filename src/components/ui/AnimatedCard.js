import React from 'react';
import { motion } from 'framer-motion';

const AnimatedCard = ({ children, className = "", ...props }) => {
  return (
    <motion.div
      className={`relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border bg-white ${className}`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      <div className="relative z-10">
        {children}
      </div>
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-3xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default AnimatedCard;
