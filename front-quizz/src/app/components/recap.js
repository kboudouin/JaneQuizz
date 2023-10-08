'use client'
import React, { useState, useEffect,} from 'react';
import html2pdf from 'html2pdf.js';

//Show all right and wrong answers 
export default function Recap({score,back,userAnswers,questionsLenght, selectedType}) {

    //function that converts the div with id=recapContent to a pdf
    const exportToPDF = () => {
        const content = document.getElementById("recapContent");
        const opt = {
            margin:       10,
            filename:     `JaneQuizz - ${selectedType}.pdf`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 1 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'landscape' }
        };

        html2pdf().from(content).set(opt).save();
    }
 
    return (
        <div>
    <div className='p-12'>
        <div className="flex justify-between pl-12 pt-12">
                        <h1 className="text-3xl font-bold "> Score: {score}/{questionsLenght}</h1>
                        <div>
                            <button className='btn btn-primary mr-2' onClick={exportToPDF} >export</button>
                            <button className='btn btn-success mr-12' onClick={back}>Choose new topic</button>
                        </div>
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
                                className={`btn btn-2xl text-3xl mr-12 ${isCorrect ? "btn-success" : "btn-error"}`}>
                                {isCorrect ? "TRUE" : "FALSE"}
                            </button>
                        </div>
                        <div className="flex card-body items-center text-center text-3xl font-bold ">
                            <h2 className='mb-6'>{item.question}</h2>
                            <div className="card-actions flex flex-wrap">
                                {item.options.map((option, optionIdx) => (
                                    <button 
                                        key={optionIdx} 
                                        className={`btn btn-secondary ${
                                            option === item.correctAnswer ? "btn-success" : 
                                            option === item.userAnswer ? "btn-error" : 
                                            ""}`}
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
