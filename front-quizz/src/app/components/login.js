"use client";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function Login({ isLogged, setIsLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //Function to verify if user exists in dummyjson
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("trying to log in");
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      toast.error("Login failed. Please check username or password");
    }

    const data = await response.json();
    //If token exists then trigger IsLogged to true and create a cookie to store first name otherwise clear inputs
    if (data.token) {
      setIsLogged(true);
      Cookies.set("Name", data.firstName);
    } else {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <div className="w-full p-6 m-auto rounded-md lg:max-w-lg">
      <h1 className="text-6xl font-bold text-center p-6">JaneQuizz</h1>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          <label className="label">
            <span className="text-base label-text">Username</span>
          </label>
          <input
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Enter Username"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <div>
          <label className="label">
            <span className="text-base label-text">Password</span>
          </label>
          <input
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered input-primary"
          />
        </div>
        <div>
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
    </div>
  );
}
