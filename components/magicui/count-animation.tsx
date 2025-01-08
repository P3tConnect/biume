"use client";

import { useEffect } from "react";
import { cn } from "@/src/lib/utils";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export default function CountAnimation({
  number,
  className
}: {
  number: number;
  className?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, number, { duration: 2 });

    return animation.stop;
  }, []);

  return <motion.span className={cn(className)}>{rounded}</motion.span>;
}