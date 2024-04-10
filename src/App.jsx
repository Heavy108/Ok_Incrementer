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

function App() {
    const [count, setCount] = useState(0); // The initial OK count
    const [showGreenUIHint, setShowGreenUIHint] = useState(false);
    const [showRedUIHint, setShowRedUIHint] = useState(false);
    const [History, setHistory] = useState([]);
    const [ShowHistory, setShowHistory] = useState(false); // Default to show history
    const [animationQueue, setAnimationQueue] = useState([]);
    const [loadedHistory, setLoadedHistory] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal stuff

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
    const handleHistory = () => {
        setShowHistory(!ShowHistory);
    };

    const historyToShow = ShowHistory ? loadedHistory.concat(History) : []; // Combine loaded and current history

    const [showIncrementAnimation, setShowIncrementAnimation] = useState(false);

    return (
        <>
            <Background />
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
                >
                    Chart
                </Button>
                <Button
                    leftIcon={<RepeatClockIcon />}
                    colorScheme="yellow"
                    variant="solid"
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
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>History</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {" "}
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
                        </>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default App;
