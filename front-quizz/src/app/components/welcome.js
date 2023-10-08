'use client'
import React, { useState, useEffect,} from 'react';

export default function Welcome({username, logout}) {
 
    return (
        <div>
    <div className="flex justify-between pl-12 pt-12">
                        <h1 className="text-5xl font-bold ">Welcome {username}</h1>
                        <button onClick={logout} className="btn btn-sm btn-primary mr-12">Logout</button>
                    </div>

                    <div className="flex justify-start pl-12 pt-4">
                        <h1 className="text-2xl font-bold ">Choose a topic and press </h1>
                        <button className="btn btn-xs btn-success mt-2 ml-2">Play</button>
                        <h1 className="text-2xl font-bold ml-2 "> to start the quizz!</h1>
                    </div>
        </div>
    );
}
