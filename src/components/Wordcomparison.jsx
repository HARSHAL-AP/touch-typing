import React, { useState, useEffect } from "react";
import style from "../styles/Wordcomparison.module.css";
import data from "../wordlists/lesson1.json";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchData } from "../redux/store";

const Wordcomparison = () => {
  const [inputText, setInputText] = useState("");
  const [correctWordsCount, setCorrectWordsCount] = useState(0);
  const [incorrectWordsCount, setIncorrectWordsCount] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [duration, setDuration] = useState(1); 
  const [timer, setTimer] = useState(duration * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [wordPerMinute, setWordPerMinute] = useState(0); 
  const wordsArray = useSelector((store) => store.data);

  useEffect(() => {
    let interval = null;

    if (timerActive) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      setTimerActive(false);
      setInputText("");
      setIsOpen(true);
    }

    return () => clearInterval(interval);
  }, [timer, timerActive]);

  const handleInputChange = (e) => {
    const text = e.target.value;
    setInputText(text);
    setTimerActive(true);
    countWords(text);
    if (text.split(" ").length >= 60) {
      setStartIndex(startIndex + 60);
    }
  };

  const handleDurationChange = (e) => {
    const selectedDuration = parseInt(e.target.value);
    setDuration(selectedDuration);
    setTimer(selectedDuration * 60);
    setTimerActive(false);
    setInputText("");
    setStartIndex(0);
    countWords(inputText);
  };

  const countWords = (text) => {
    const inputWords = text.trim().toLowerCase().split(" ");

    let correctCount = 0;
    let incorrectCount = 0;

    inputWords.forEach((word, index) => {
      const expectedWord = wordsArray[startIndex + index];
      if (expectedWord && word === expectedWord) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    setCorrectWordsCount(correctCount);
    setIncorrectWordsCount(incorrectCount);

    const totalWordsCount = correctCount + incorrectCount;
    const accuracyPercentage =
      totalWordsCount > 0 ? (correctCount / totalWordsCount) * 100 : 0;
    setAccuracy(accuracyPercentage.toFixed(2));

    const wordsPerMinute = calculateWordsPerMinute(); 
    setWordPerMinute(wordsPerMinute); 
  };

  const calculateWordsPerMinute = () => {
    const elapsedMinutes = (duration * 60 - timer) / 60; 
    const wordsPerMinute = correctWordsCount / elapsedMinutes; 
    return wordsPerMinute.toFixed(0); 
  };

  const expectedWords = wordsArray.slice(startIndex, startIndex + 60);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div className={style.comtime}>
        <select value={duration} onChange={handleDurationChange}>
          <option value={1}>1 minute</option>
          <option value={2}>2 minutes</option>
          <option value={5}>5 minutes</option>
        </select>
      </div>

      <div className={style.combody}>
        {expectedWords.map((word, index) => (
          <span
            key={startIndex + index}
            style={{
              marginRight: "5px",
              color:
                startIndex + index < inputText.split(" ").length
                  ? wordsArray[startIndex + index] ===
                    inputText.split(" ")[startIndex + index]
                    ? "green"
                    : "red"
                  : "black",
            }}
          >
            {word}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        className={style.cominput}
        placeholder="Start typing..."
        disabled={timer === 0 ? true : false}
      />
      <div className={style.liveresultcon}>
        <div>
          <h4>Time remaining:</h4>
          <p>{timer} sec</p>
        </div>
        <div>
          <h4>Correct words:</h4>
          <p>{correctWordsCount}</p>
        </div>
        <div>
          <h4>Accuracy:</h4>
          <p>{accuracy}%</p>
        </div>
        <div>
          <h4>WPM:</h4>
          <p>{wordPerMinute}</p>
        </div>
      </div>
      {isOpen && (
        <div className={style.modal}>
          <div className={style.modalcontent}>
            <h2>Your Test Score..</h2>
            <div className={style.resulcon}>
              <div>
                <h4>Correct words:</h4>
                <p>{correctWordsCount}</p>
              </div>
              <div>
                <h4>WPM:</h4>
                <p>{wordPerMinute}</p> 
              </div>
              <div>
                <h4>Accuracy:</h4>
                <p>{accuracy}%</p>
              </div>
            </div>

            <div className={style.retaketest}>
              <button onClick={closeModal}>X</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wordcomparison;
