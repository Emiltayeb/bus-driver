import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

const animations = {
 initial: { opacity: 0 },
 animate: { opacity: 1 },
 exit: { opacity: 0 }
};

const AnimatedPage: React.FC<HTMLMotionProps<'div'>> = function ({ children, ...props }) {
 return (
  <motion.div
   {...props}
   variants={animations}
   initial="initial"
   animate="animate"
   exit="exit"
   transition={{ duration: 0.5 }}
  >
   {children}
  </motion.div>
 );
};

export default AnimatedPage;
