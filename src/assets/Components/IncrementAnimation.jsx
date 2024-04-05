import React, { useState } from "react";
import style from "./IncrementAnimation.module.css";

const IncrementAnimation = ({ onAnimationComplete }) => {
  const [visible, setVisible] = useState(true);

  const onAnimationEnd = () => {
    setVisible(false);
    onAnimationComplete();
  };

  return (
    <>
      {visible && (
        <div className={style.animation} onAnimationEnd={onAnimationEnd}>
          +1
        </div>
      )}
    </>
  );
};

export default IncrementAnimation;
