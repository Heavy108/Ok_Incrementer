import React, { useEffect } from "react";
import JSConfetti from "js-confetti";

function Confetti() {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: [
        // "#08090a",
        // "#64c3fc",
        // "#587df3",
        // "#775df3",
        // "#e56984",
        // "#e94636",
        // "f5c44c",
        // "#2dab6b",
        // "yellow",
        // "orange",
        // "red",

        "#0000FF", // Blue
        "#0000CC", // Dark Blue
        "#000099", // Navy Blue
        "#3366FF", // Royal Blue
        "#6699FF", // Sky Blue
        "#66CCFF", // Light Blue
        "#99CCFF", // Pale Blue
        "#3399FF", // Cerulean Blue
        "#66FFFF", // Cyan
        "#99FFFF", // Light Cyan
      ],
      confettiRadius: 6,
      confettiNumber: 500,
    });
  }, []);

  return null;
}
export default Confetti;
