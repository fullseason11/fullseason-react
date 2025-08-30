import React from "react";
import { motion } from "motion/react";

/** 아래→위 0.7초 슬라이드/페이드 인 (in-view 한 번만) */
export default function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut", delay: delay / 1000 }}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
