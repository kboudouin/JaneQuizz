"use client";
import React, { useState } from "react";
import { redirect } from "next/navigation";
import LoginForm from "./components/login";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);
  //Check if the user has logged in, and redirect to quizz page
  if (isLogged) {
    redirect("/quizz");
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <LoginForm isLogged={isLogged} setIsLogged={setIsLogged} />
    </div>
  );
}
