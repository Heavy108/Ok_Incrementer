import React, { useEffect } from "react";
import JSConfetti from "js-confetti";

function Confetti() {
  useEffect(() => {
    const jsConfetti = new JSConfetti();
    jsConfetti.addConfetti({
      confettiColors: [
        '#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7',
      ],
    });

  
    
  }, []);

  return null; 
}

export default Confetti;
