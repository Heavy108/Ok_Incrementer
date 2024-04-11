import React, { useState } from "react";
import girlStanding from "../assets/background_img/girl_standinf.gif";
import levi from "../assets/background_img/levi-ackerman-in-aot.3840x2160.gif";
import elf from "../assets/background_img/elf-girl-in-bamboo-forest.3840x2160.gif";
import levi2 from "../assets/background_img/levi-ackerman.1920x1080.gif";
import styles from "../styles/Background.module.css";


function Background({currentIndex}) {
    const backgroundImages = [girlStanding, levi, elf, levi2];
      return (
        <div className={styles.background_video}>
            <img
                src={backgroundImages[currentIndex]}
                
                className={styles.gif}
            />
           
           
        </div>
    );
}

export default Background;
