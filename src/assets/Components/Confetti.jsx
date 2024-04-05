import React, { useEffect } from "react";
import JSConfetti from "js-confetti";

function Confetti() {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: [
        "#08090a",
        "#64c3fc",
        "#587df3",
        "#775df3",
        "#e56984",
        "#e94636",
        "f5c44c",
        "#2dab6b",
        "yellow",
        "orange",
        "red",
        
      ],
      confettiRadius: 6,
      confettiNumber: 500,
    });
  }, []);

  return null;
}
export default Confetti;
