"use client";
import React, { useState, useEffect } from "react";
import html2pdf from "html2pdf.js";

//Show all right and wrong answers
export default function Recap({
  score,
  back,
  userAnswers,
  questionsLenght,
  selectedType,
  replay,
}) {
  //function that converts the div with id=recapContent to a pdf
  const exportToPDF = () => {
    const content = document.getElementById("recapContent");
    const opt = {
      margin: 10,
      filename: `JaneQuizz - ${selectedType}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().from(content).set(opt).save();
  };

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between p-4 sm:p-12">
          <h1 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-0">
            Score: {score}/{questionsLenght}
          </h1>
          <div>
            <div className="flex justify-between">
              <button
                className="btn btn-success sm:mr-2 mb-4 sm:mb-0"
                onClick={replay}
              >
                Try again
              </button>
              <button
                className="btn btn-secondary sm:mr-2 mb-4 sm:mb-0"
                onClick={back}
              >
                Choose new topic
              </button>
              <button
                className="btn btn-primary sm:mr-2 mb-4 sm:mb-0"
                onClick={exportToPDF}
              >
                export
              </button>
            </div>
          </div>
        </div>
        <div className="text-center card bg-primary p-4 sm:p-5 m-4 sm:m-12">
          <h1 className="text-3xl sm:text-6xl font-extrabold">
            {score === 0
              ? "Well, that was really bad! "
              : score < questionsLenght / 2
              ? "You can do better! "
              : score === questionsLenght
              ? "An expert at work! "
              : "Good Job! "}
          </h1>
        </div>
        <div id="recapContent">
          {userAnswers.map((item, idx) => {
            const isCorrect = item.userAnswer === item.correctAnswer;

            return (
              <div className="card bg-primary m-12" key={idx}>
                <div className="flex justify-between pl-8 pt-8">
                  <h1 className="text-xl font-bold"> Question {idx + 1}</h1>
                  {/* If answer is correct, show green true otherwise show red false */}
                  <button
                    className={`btn btn-2xl text-3xl mr-12 ${
                      isCorrect ? "btn-success" : "btn-error"
                    }`}
                  >
                    {isCorrect ? "TRUE" : "FALSE"}
                  </button>
                </div>
                <div className="flex card-body items-center text-center text-3xl font-bold ">
                  <h2 className="mb-6">{item.question}</h2>
                  <div className="card-actions flex flex-wrap">
                    {item.options.map((option, optionIdx) => (
                      <button
                        key={optionIdx}
                        className={`btn btn-secondary ${
                          option === item.correctAnswer
                            ? "btn-success"
                            : option === item.userAnswer
                            ? "btn-error"
                            : ""
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
