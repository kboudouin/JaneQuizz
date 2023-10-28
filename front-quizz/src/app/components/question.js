"use client";
import React, { useState, useEffect } from "react";

export default function Question({
  question,
  nextQuestion,
  selectedType,
  currentQuestionIndex,
  questionsLenght,
  endGame,
  userAnswers,
  setUserAnswers,
  score,
  setScore,
}) {
  const [timer, setTimer] = useState(10);
  //10 seconds countdown, when countdown runs out = endGame()
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          endGame();
          return 10;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  //When user answers : store answer in array, increment score if answer is correct, reset timer and go to the next question
  const handleAnswer = (selectedOption) => {
    const answerRecord = {
      question: question.question,
      options: question.options,
      correctAnswer: question.answer,
      userAnswer: selectedOption,
    };
    setUserAnswers((prev) => [...prev, answerRecord]);
    if (selectedOption === question.answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setTimer(10);
    nextQuestion();
  };

  if (!question) return null;

  return (
    <div className="p-6 w-full h-screen">
      <div className="flex justify-between pb-10">
        <h1 className="text-xl font-bold"> {selectedType}</h1>
      </div>
      <div className="card bg-primary">
        <div className="flex justify-between pl-8 pt-8">
          <h1 className="text-xl font-bold">
            {" "}
            {currentQuestionIndex + 1}/{questionsLenght}
          </h1>
          <button className="btn btn-2xl text-3xl btn-error mr-12">
            {timer}
          </button>
        </div>
        <div className=" flex card-body items-center text-center text-3xl font-bold ">
          <h2 className="mb-6">{question.question}</h2>
          <div className="card-actions flex flex-wrap">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                className="btn btn-secondary"
                onClick={() => handleAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
