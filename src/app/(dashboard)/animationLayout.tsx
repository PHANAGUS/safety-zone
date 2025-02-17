"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <div style={{ position: "relative" }}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ position: "absolute", width: "100%" }}
        >
          {children}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
