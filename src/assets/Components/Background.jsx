import sample from "./1.mp4"
import style from "./Background.module.css";
function Background() {
  return (
    <div className={style.background_video}>
      <video autoPlay muted loop className={style.video}>
        <source src={sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default Background;
