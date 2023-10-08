'use client'
import React, { useState, useEffect,} from 'react';
import { redirect } from 'next/navigation'
import QuestionCard from '../components/question'
import TypeCard from '../components/type'
import RecapCard from '../components/recap'
import WelcomeCard from '../components/welcome'
import Cookies from "js-cookie";

export default function Quizz() {
  const [username, setUsername] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [recap, setRecap] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionsLenght, setquestionsLenght] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  //Check if user is still connected, if not redirect to index
  useEffect(() => {
    if (!Cookies.get("Name")) {
        redirect('/')
  } else {
    setUsername(Cookies.get('Name'))
  }
  }, [username]);

//Call JaneQ api, and retreive all questions for specific type
useEffect(() => {
    if (selectedType) {
        fetch(`http://127.0.0.1:8000/questions/${encodeURIComponent(selectedType)}`)
            .then(response => response.json())
            .then(data => {
                setQuestions(data.questions);
                setquestionsLenght(data.questions.length)
            })
            .catch(error => {
                console.error("Error getting questions:", error);
            });
    }
}, [selectedType]);

//Call the JaneQ useEffect, and toggle the QuestionCard Component
  const startQuiz = (type) => {
    console.log("startQuiz called with type:", type);
    setSelectedType(type);
  };

//Send next question to QuestionCard, if no questions then endGame()
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      endGame();
    }
  };

// Toggle the recap component and show userAnswers
   const endGame = async () => {
      setRecap(true)
  }
  
// Back to Topic Choose, toggle WelcomeCard and TypeCard, and reset the game logic
   const back = async () => {
       setSelectedType(null);
       setRecap(null);
       setUserAnswers([])
       setScore(0)
       setquestionsLenght(0);
       setCurrentQuestionIndex(0);

  }

 //Logout function to redirect to index page
    const logout = async () => {
      Cookies.remove('Name')
      setUsername('')
  }



    return (
        <div>
            {recap && (<RecapCard
                            score={score} 
                            back={back} 
                            userAnswers={userAnswers} 
                            questionsLenght={questionsLenght}
                            selectedType={selectedType} />)}

            {!selectedType && !recap && (
                <div>
                    <WelcomeCard username={username} logout={logout}/>
                    <TypeCard startQuiz={startQuiz} />
                </div>
            )}
            {selectedType && !recap && (
                <QuestionCard 
                    endGame={endGame} 
                    currentQuestionIndex={currentQuestionIndex} 
                    question={questions[currentQuestionIndex]} 
                    selectedType={selectedType} 
                    nextQuestion={nextQuestion} 
                    questionsLenght={questionsLenght} 
                    userAnswers={userAnswers}
                    setUserAnswers={setUserAnswers}
                    setScore={setScore}
                    score={score}
                />
            )}
        </div>
    );
}
