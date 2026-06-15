"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToggle() {
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const updateScrollDirection = () => {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;

      setIsNearBottom(distanceFromBottom < 220);
    };

    updateScrollDirection();
    window.addEventListener("scroll", updateScrollDirection, { passive: true });
    window.addEventListener("resize", updateScrollDirection);

    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
      window.removeEventListener("resize", updateScrollDirection);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: isNearBottom ? 0 : window.scrollY + window.innerHeight * 0.85,
      behavior: "smooth",
    });
  };

  const Icon = isNearBottom ? ArrowUp : ArrowDown;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isNearBottom ? "Scroll to top" : "Scroll down"}
      className="fixed bottom-6 right-6 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-black text-white shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
    >
      <Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
