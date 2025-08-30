// src/RevealUp.jsx
import { motion } from "motion/react";

/**
 * 스크롤 진입 시 아래→위로 0.7초 슬라이드 + 페이드
 * - once: 한 번만 실행
 * - delay: 초 단위(예: 0.2)
 */
export default function RevealUp({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}
