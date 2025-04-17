"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useTheme } from "next-themes";

export const AnimatedGradientBackground = ({
  className,
  intensity = 0.2,
  speed = 0.1,
}: {
  className?: string;
  intensity?: number;
  speed?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Éviter les problèmes d'hydratation
  useEffect(() => {
    setMounted(true);

    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        setPosition({
          x: x * intensity,
          y: y * intensity,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden pointer-events-none",
        className,
      )}
    >
      <motion.div
        animate={{
          x: position.x * dimensions.width,
          y: position.y * dimensions.height,
        }}
        transition={{ type: "spring", damping: 15, stiffness: 50 }}
        className="absolute inset-0"
      >
        {/* Gradient principal - adapté au thème */}
        <div
          className={cn(
            "absolute -inset-[100px] rounded-full opacity-40 blur-3xl",
            "transition-opacity duration-1000 ease-in-out",
            isDark ? "opacity-20" : "opacity-30",
          )}
          style={{
            background: isDark
              ? "radial-gradient(circle at center, hsl(var(--primary)) 0%, transparent 70%)"
              : "radial-gradient(circle at center, hsl(var(--primary)/0.7) 0%, transparent 70%)",
            top: "30%",
            left: "15%",
            width: "50%",
            height: "50%",
          }}
        />

        {/* Gradient secondaire - adapté au thème */}
        <div
          className={cn(
            "absolute -inset-[100px] rounded-full opacity-40 blur-3xl",
            "transition-opacity duration-1000 ease-in-out",
            isDark ? "opacity-15" : "opacity-25",
          )}
          style={{
            background: isDark
              ? "radial-gradient(circle at center, hsl(var(--secondary)) 0%, transparent 70%)"
              : "radial-gradient(circle at center, hsl(var(--secondary)/0.5) 0%, transparent 70%)",
            bottom: "20%",
            right: "10%",
            width: "60%",
            height: "60%",
          }}
        />
      </motion.div>
    </div>
  );
};
