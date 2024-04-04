import React, { useEffect } from "react";
import JSConfetti from "js-confetti";

function Confetti() {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    });

  
    
  }, []);

  return null; 
}

export default Confetti;
