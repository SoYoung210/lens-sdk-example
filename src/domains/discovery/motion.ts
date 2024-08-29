export const list = {
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
  hidden: {
    opacity: 0,
  },
};

export const item = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -10 },
};

export const itemTransition = {
  type: 'spring',
  stiffness: 480,
  damping: 38,
  mass: 1,
};
