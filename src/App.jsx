import { useState, useEffect } from "react";
import style from "./styles/App.module.css";
import { saveHistory, loadHistory } from "./js/historyStorage";
import Confetti from "./components/Confetti";
import IncrementAnimation from "./components/IncrementAnimation";
import Background from "./components/Background";
import {
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { AddIcon, RepeatClockIcon } from "@chakra-ui/icons";
import OKSticker from "./assets/ok_sticker.png";
import HistoryChart from "./components/HistoryChart";

function App() {
    const [count, setCount] = useState(0); // The initial OK count
    const [showGreenUIHint, setShowGreenUIHint] = useState(false);
    const [showRedUIHint, setShowRedUIHint] = useState(false);
    const [History, setHistory] = useState([]);
    const [ShowHistory, setShowHistory] = useState(false); // Default to show history
    const [animationQueue, setAnimationQueue] = useState([]);
    const [loadedHistory, setLoadedHistory] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal stuff
    const [currentIndex, setCurrentIndex] = useState(0); //BackgroundIndex
    const [showChart, setShowChart] = useState(false); //chart stuff

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
    const handleChartClick = () => {
        setShowChart(!showChart);
        setShowHistory(false);
    };
    const handleBgClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % 5);
        <Background currentIndex />;
    };

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
    const handleHistory = () => {
        setShowHistory(!ShowHistory);
        setShowChart(false);
    };
    const handleCloseModal = () => {
        onClose();
        setShowHistory(false); // Reset showHistory when modal is closed
        setShowChart(false); // Reset showChart when modal is closed
    };

    const historyToShow = ShowHistory ? loadedHistory.concat(History) : []; // Combine loaded and current history
    const historyToChart = showChart ? loadedHistory.concat(History) : [];

    const [showIncrementAnimation, setShowIncrementAnimation] = useState(false);

    return (
        <>
            <Background currentIndex={currentIndex} />
            <div
                style={{
                    padding: "1rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                }}
            >
                <img
                    style={{
                        height: "6rem",
                    }}
                    src={OKSticker}
                    alt="OK"
                />
                <Button
                    leftIcon={<RepeatClockIcon />}
                    colorScheme="purple"
                    variant="solid"
                    onClick={() => {
                        onOpen();
                        handleChartClick();
                    }}
                >
                    Chart
                </Button>

                <Button
                    leftIcon={<RepeatClockIcon />}
                    colorScheme="yellow"
                    variant="solid"
                    onClick={handleBgClick}
                >
                    BG
                </Button>
            </div>
            <div
                style={{
                    textAlign: "center",
                }}
            >
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

                {!showRedUIHint && !showGreenUIHint && (
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
                )}

                {count % 10 === 0 && count !== 0 && <Confetti />}

                <div
                    style={{
                        paddingTop: "8rem",
                        paddingBottom: "4rem",
                    }}
                >
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
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                    }}
                >
                    <Button
                        onClick={() => {
                            onOpen();
                            handleHistory();
                        }}
                        leftIcon={<RepeatClockIcon />}
                        colorScheme="blue"
                        variant="solid"
                    >
                        History
                    </Button>

                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="blue"
                        variant="solid"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </div>
            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{showChart ? "Chart" : "History"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>
                            {ShowHistory && (
                                <ul>
                                    {historyToShow.map((entry, index) => (
                                        <li key={index}>
                                            {entry.count} - {entry.date}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {showChart && (
                                <HistoryChart history={historyToChart} />
                            )}
                        </>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default App;
