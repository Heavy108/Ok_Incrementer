import { useState, useEffect } from "react";
import style from "./App.module.css";
import { saveHistory, loadHistory } from "./assets/Components/historyStorage";
import Confetti from "./assets/Components/Confetti";
import IncrementAnimation from "./assets/Components/IncrementAnimation";

function App() {
  const [Counter, setCounter] = useState(0);
  const [History, setHistory] = useState([]);
  const [ShowHistory, setShowHistory] = useState(false);
  const [animationQueue, setAnimationQueue] = useState([]);

  useEffect(() => {
    if (animationQueue.length > 0) {
      setShowIncrementAnimation(true);
    } else {
      setShowIncrementAnimation(false);
    }
  }, [animationQueue]);

  const addHistory = () => {
    const currentDate = new Date().toLocaleString();
    setHistory([...History, { count: Counter, date: currentDate }]);
    saveHistory([...History, { count: Counter, date: currentDate }]);
  };

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
    const newQueue = Array.from({ length: 10 }, (_, index) => index);
    setAnimationQueue([...animationQueue, ...newQueue]);
  };

  const handleAnimationComplete = () => {
    setAnimationQueue((prevQueue) => prevQueue.slice(5));
  };

  const handleSave = () => {
    addHistory();
    setCounter(0);
  };

  const toggleHistory = () => {
    setShowHistory(!ShowHistory);
  };

  const historyToShow = ShowHistory ? loadHistory() : History;

  const [showIncrementAnimation, setShowIncrementAnimation] = useState(false);

  return (
    <>
      <center>
        <h1 className={style.head}>OK INCREMENTER</h1>
      </center>

      <div className={style.cen}>
        <div className={style.row}>
          <button className={style.ben} onClick={toggleHistory}>
            {ShowHistory ? "Hide History" : "Show History"}
          </button>

          <h3 className={style.cunt}>Count: {Counter}</h3>
          {(Counter % 10 === 0 & Counter != 0) && <Confetti />}

          <button className={style.ben} onClick={handleSave}>
            SAVE
          </button>
        </div>
        {ShowHistory && (
          <div>
            <h2 className={style.text}>History:</h2>
            <ul className={style.text}>
              {historyToShow.map((entry, index) => (
                <li className={style.text} key={index}>
                  {entry.count} - {entry.date}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <button className={style.but} onClick={handleClick}>
            OK
          </button>
        </div>

        {animationQueue.map((index) => (
          <IncrementAnimation
            key={index}
            onAnimationComplete={handleAnimationComplete}
          />
        ))}
      </div>
    </>
  );
}

export default App;
