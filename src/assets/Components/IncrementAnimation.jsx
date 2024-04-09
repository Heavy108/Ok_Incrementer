import React, { useState } from "react";
import style from "./IncrementAnimation.module.css";
import bubbleImage from "../headshot.png"; 

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
          <div className={style.bubbleContent}>
            <img src={bubbleImage} alt="Bubble" className={style.bubbleImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default IncrementAnimation;