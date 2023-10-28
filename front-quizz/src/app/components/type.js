"use client";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function Type({ startQuiz }) {
  const [quizTypes, setQuizTypes] = useState([]);

  // Call janeQ api to retreive all question types
  useEffect(() => {
    fetch("http://127.0.0.1:8000/types")
      .then((response) => response.json())
      .then((data) => setQuizTypes(data.types))
      .catch((err) => {
        console.error("Error fetching types:", err);
        toast.error("Error fetching types");
      });
  }, []);

  return (
    <div className="p-6 h-screen">
      {quizTypes.map((type, index) => (
        <div
          key={index}
          className="stats m-3 bg-primary text-primary-content transform transition duration-500 hover:scale-105"
        >
          <div className="stat">
            <div className="stat-value">{type}</div>
            <div className="stat-actions">
              {/* Call the StartQuizz function from Quizz Page when clicked */}
              <button
                onClick={() => startQuiz(type)}
                className="btn btn-sm btn-success"
              >
                Play
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
