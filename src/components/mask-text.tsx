"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// const phrases = [
//   "ELECTRONICS ENGINEER",
//   "SOFTWARE ENGINEER",
//   "STRATEGY",
//   "CREATIVE",
// ];

export function MaskText({ phrases }: { phrases: string[] }) {
  const animation = {
    initial: { y: "100%" },
    enter: (i: number) => ({
      y: "0",
      transition: {
        duration: 0.75,
        ease: [0.33, 1, 0.68, 1] as [number, number, number, number],
        delay: 0.075 * i,
      },
    }),
  };

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, {
    amount: 0.75,
    once: true,
  });

  return (
    <div ref={ref} className="space-y-16">
      {phrases.map((phrase, index) => {
        return (
          <div key={index} className="overflow-hidden ">
            <motion.p
              className="block text-[clamp(1.5rem,8.4vw,13rem)] font-extrabold leading-[0.76] tracking-[-0.02em] whitespace-nowrap"
              custom={index}
              variants={animation}
              initial="initial"
              animate={inView ? "enter" : ""}
            >
              {phrase}
            </motion.p>
          </div>
        );
      })}
    </div>
  );
}
