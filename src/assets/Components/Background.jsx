import sample from "./2.gif";
import style from "./Background.module.css";
function Background() {
  return (
    <div className={style.background_video}>
      {/* <video autoPlay muted loop className={style.video}>
        <source src={sample} type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}
       <img src={sample} alt="Background GIF" className={style.gif} />
    </div>
  );
}

export default Background;
