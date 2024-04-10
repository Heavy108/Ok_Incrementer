import { useState, useEffect } from "react";
import style from "./styles/App.module.css";
import { saveHistory, loadHistory } from "./js/historyStorage";
import Confetti from "./components/Confetti";
import IncrementAnimation from "./components/IncrementAnimation";
import Background from "./components/Background";

function App() {
    const [count, setCount] = useState(0); // The initial OK count
    const [showGreenUIHint, setShowGreenUIHint] = useState(false);
    const [showRedUIHint, setShowRedUIHint] = useState(false);
    const [History, setHistory] = useState([]);
    const [ShowHistory, setShowHistory] = useState(false); // Default to show history
    const [animationQueue, setAnimationQueue] = useState([]);
    const [loadedHistory, setLoadedHistory] = useState([]);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setShowGreenUIHint(false);
        }, 100);

        return () => clearTimeout(timeoutID);
    }, [showGreenUIHint]);

    useEffect(() => {
        const timeoutID = setTimeout(() => {
            setShowRedUIHint(false);
        }, 100);

        return () => clearTimeout(timeoutID);
    }, [showRedUIHint]);

    useEffect(() => {
        loadHistory().then(setLoadedHistory).catch(console.error);
    }, []);

    useEffect(() => {
        if (animationQueue.length > 0) {
            setShowIncrementAnimation(true);
        } else {
            setShowIncrementAnimation(false);
        }
    }, [animationQueue]);

    const addHistory = () => {
        const currentDate = new Date().toLocaleString();
        const newHistory = { count: count, date: currentDate };
        setHistory([...History, newHistory]);
        saveHistory(newHistory);
    };

    const handleAnimationComplete = () => {
        setAnimationQueue((prevQueue) => prevQueue.slice(5));
    };

    const handleSave = () => {
        addHistory();
        setCount(0);
    };

    const toggleHistory = () => {
        setShowHistory(!ShowHistory);
    };

    const historyToShow = ShowHistory ? loadedHistory.concat(History) : []; // Combine loaded and current history

    const [showIncrementAnimation, setShowIncrementAnimation] = useState(false);

    return (
        <>
            <Background />
            <center>
                <h1 className={style.head}>CHANGE!!! </h1>
            </center>
            <div className={style.cen}>
                {/* {ShowHistory && (
          <div className={style.history}>
            <div>
              <h2 className={style.text}>History</h2>
            </div>
            <ul className={style.text}>
              {historyToShow.map((entry) => (
                <li className={style.text} key={entry.id}>
                  {entry.count} - {entry.date}
                </li>
              ))}
            </ul>
          </div>
        )} */}

                {showGreenUIHint && (
                    <h3
                        style={{
                            fontSize: "3rem",
                            color: "#2ecc71",
                        }}
                    >
                        Counter: {count}
                    </h3>
                )}

                {showRedUIHint && (
                    <h3
                        style={{
                            fontSize: "3rem",
                            color: "#e74c3c",
                        }}
                    >
                        Counter: {count}
                    </h3>
                )}

                <h3
                    onClick={() => {
                        setCount((count) => count - 1);
                        setShowRedUIHint(true);
                    }}
                    style={{
                        fontSize: "3rem",
                        color: "white",
                    }}
                >
                    Counter: {count}
                </h3>
                {count % 10 === 0 && count !== 0 && <Confetti />}

                <div>
                    <button
                        className={style.but}
                        onClick={() => {
                            navigator.vibrate(100);

                            setCount((count) => count + 1);
                            setShowGreenUIHint(true);
                            const newQueue = Array.from(
                                { length: 5 },
                                (_, index) => index,
                            );
                            setAnimationQueue([...animationQueue, ...newQueue]);
                        }}
                    >
                        OK
                    </button>
                </div>
                {animationQueue.map((_, index) => (
                    <IncrementAnimation
                        key={index}
                        onAnimationComplete={handleAnimationComplete}
                    />
                ))}
                <div className={style.row}>
                    <button className={style.ben} onClick={toggleHistory}>
                        {ShowHistory ? "Hide History" : "Show History"}
                    </button>
                    <button className={style.ben} onClick={handleSave}>
                        SAVE
                    </button>
                </div>
            </div>
        </>
    );
}

export default App;
