import React, { useState } from "react";
import girlStanding from "../assets/background_img/girl_standinf.gif";
import suzume from "../assets/background_img/suzumes-locking-up.1920x1080.gif";
import elf from "../assets/background_img/elf-girl-in-bamboo-forest.3840x2160.gif";
import levi2 from "../assets/background_img/levi-ackerman.1920x1080.gif";
import girl from "../assets/background_img/lonely-girl.1920x1080.gif"
import styles from "../styles/Background.module.css";


function Background({currentIndex}) {
    const backgroundImages = [girlStanding, suzume, elf, levi2,girl];
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
