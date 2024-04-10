import React, { useState } from "react";
import style from "../styles/IncrementAnimation.module.css";
import bubbleImage from "../assets/headbubble.png";

const IncrementAnimation = ({ onAnimationComplete }) => {
  const [visible, setVisible] = useState(true);

  const onAnimationEnd = () => {
    setVisible(false);
    onAnimationComplete();
  };

  return (
    <>
      {visible && (
        <div className={style.bubble} onAnimationEnd={onAnimationEnd}>
          <img className={style.image} src={bubbleImage} alt="Bubble" />
        </div>
      )}
    </>
  );
};

export default IncrementAnimation;
