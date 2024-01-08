"use client";

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Papa from 'papaparse'
import ResultPage from './resultsPage/page.js';
import Pentagon from './components/Pentagon';

// import { useRouter } from 'next/router';
// let useRouter;
// if (typeof window !== 'undefined') {
//   useRouter = require('next/router').useRouter;
// }


  async function startAndAsk(msg) {
    try {
      // Create a new thread
      const threadResponse = await fetch('/api/thread', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const threadData = await threadResponse.json();
      const threadId = threadData["id"];

      // Send a message
      const messageFormData = new FormData();
      messageFormData.append('threadId', threadId);
      messageFormData.append('content', msg);

      await fetch('/api/messages', {
        method: 'POST',
        body: messageFormData,
      });

      // Start the assistant
      const assistantFormData = new FormData();
      assistantFormData.append('instructions', "You must only return a singular number. Under any circumstances.");
      assistantFormData.append('threadId', threadId);
      assistantFormData.append('assistantId', process.env.NEXT_PUBLIC_REACT_APP_ASSISTANT_ID);

      await fetch('/api/assistant/run', {
        method: 'POST',
        body: assistantFormData,
      });

      // Wait for a moment to ensure the assistant has time to process
      // await new Promise(resolve => setTimeout(resolve, 6000)); // Adjust time as needed

      // Fetch the messages
      const timeoutDuration = 40000; // Timeout duration in milliseconds, e.g., 30000 for 30 seconds
      const startTime = Date.now();


      while (true) {
        // Check for timeout
        if (Date.now() - startTime > timeoutDuration) {
          console.log('Timeout reached');
          break;
        }
        // console.log("trying to check for: " + threadId);

        const messagesResponse = await fetch(`/api/messages?threadId=${threadId}`, {
          method: 'GET'
        });
        const messagesData = await messagesResponse.json();
        const resp = messagesData["messages"]["body"]["data"][0]["content"][0]["text"]["value"];

        if (messagesData["messages"]["body"]["data"].length > 1 && resp !== '') {
          console.log(resp);
          return(resp);
          break;
        }
      }



    } catch (error) {
      console.error('Error in processing:', error);
    }
  }

export default function Home() {
  // const router = useRouter();
  // const [router, setRouter] = useState(null);
  // useEffect(() => {
  //   setRouter(require('next/router'));
  // }, []);


  const [file, setFile] = useState(null);
  const [sortedDb, setSortedDb] = useState(null);

  const [creativity, setCreativity] = useState(50);
  const [feasibility, setFeasibility] = useState(50);
  const [management, setManagement] = useState(50);
  const [impact, setImpact] = useState(50);
  const [environmentalImpact, setEnvironmentalImpact] = useState(50);

  const handleFileChange = async (event) => {
  const uploadedFile = event.target.files[0];
  setFile(uploadedFile);





  const db = {};

  const prefdesc = [
    "TC",
    "F",
    "I",
    "N",
    "E",
    "M",
  ];
  const prefixes1 = [
"Do not justify anything. Your response MUST be in the integer format do not give any variance in the prices (if you find yourself wanting to, just return the average). Return all your answers in Canadian Dollars (CAD), but do not actually write out CAD in the answer (it should just be an integer). I cannot stress enough the importance of formatting; this response will be directly inputted back into a computer program so you cannot include any introductory text like [Here you go:] and it cannot be formatted with mathematica or otherwise; should just be text in integer format. IF YOU START JUSTIFYING THINGS, DO NOT OUTPUT IT. ONLY ONE INTEGER. I CANNOT STRESS HOW IMPORTANT THIS IS. to solve the following problem:",
"Do not justify anything. Your response MUST be in the integer format, do not give any variance in the score (if you find yourself wanting to, just return the average). I cannot stress enough the importance of formatting; this response will be directly inputted back into a computer program so you cannot include any introductory text like [Here you go:] and it cannot be formatted with mathematica or otherwise; should just be text in integer format. IF YOU START JUSTIFYING THINGS, DO NOT OUTPUT IT. ONLY ONE INTEGER. I CANNOT STRESS HOW IMPORTANT THIS IS. to solve the following problem:",
"",
"",
"",
"",
  ];
  const prefixes2 = [
    "provide AN ACTUAL TOTAL COST estimation for the following solution: {SOLUTION}",
    "provide A FESABILITY SCORE estimation for the following solution:",
    "",
    "",
    "",
    "",
  ];
  try {
      const parseResult = await new Promise((resolve, reject) => {
        Papa.parse(uploadedFile, {
          complete: (result) => resolve(result),
          header: true,
          skipEmptyLines: true,
          dynamicTyping: true,
          error: (error) => reject(error),
        });
      });

      await Promise.all(
        parseResult.data.map(async (data) => {
          const answers = {};
          answers["ID"] = data["id"];
          await Promise.all(
            prefixes1.map(async (prefix, index) => {
              // const msg = prefix + data["problem"] + prefixes2[index] + data["solution"];
              // answers[prefdesc[index]] = await startAndAsk(msg);
              answers[prefdesc[index]] = Math.floor(Math.random() * 101);
            })
          );

          answers["TC"] *= 100000;
          // individual stuff
          answers["N"] *= creativity/100;
          answers["F"] *= feasibility/100;
          answers["M"] *= management/100;
          answers["I"] *= impact/100;
          answers["E"] *= environmentalImpact/100;

          answers["Overall"] = (answers["N"]+answers["F"]+answers["M"]+answers["I"]+answers["E"])/
            (creativity+feasibility+management+impact+environmentalImpact) * 100;

          db[data["id"]] = answers;
        })
      );

      const sortedDbArray = Object.values(db).sort((a, b) => b.Overall - a.Overall);
      setSortedDb(sortedDbArray);

      console.log(sortedDb);
      console.log(sortedDbArray);
      // window.location.href = '/resultsPage';
      // router.push('/resultsPage');
    } catch (error) {
      console.error('Error parsing CSV or processing data:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        ILOVETEST PAGES!!!
          <code className="font-mono font-bold">app/page.tsx</code>
        </p>

      </div>

      <input type="file" onChange={handleFileChange} style={{ display: 'block', margin: '20px auto' }} />

      <form>
      <div className="font-medium text-gray-700">
        Creativity: {creativity}
      </div>
    <Slider
      value={creativity}
      onChange={(e, newValue) => {
        if (typeof newValue === 'number') {
          setCreativity(newValue);
        }
      }}
      aria-label="Creativity/Novelty"
      valueLabelDisplay="auto"
    />
      <div className="font-medium text-gray-700">
        Feasibility: {feasibility}
      </div>
    <Slider
      value={feasibility}
      onChange={(e, newValue) => {
        if (typeof newValue === 'number') {
          setFeasibility(newValue);
        }
      }}
      aria-label="Idea Feasibility"
      valueLabelDisplay="auto"
    />
      <div className="font-medium text-gray-700">
        Management: {management}
      </div>
    <Slider
      value={management}
      onChange={(e, newValue) => {
        if (typeof newValue === 'number') {
          setManagement(newValue);
        }
      }}
      aria-label="Management"
      valueLabelDisplay="auto"
    />
      <div className="font-medium text-gray-700">
        Impact: {impact}
      </div>
    <Slider
      value={impact}
      onChange={(e, newValue) => {
        if (typeof newValue === 'number') {
          setImpact(newValue);
        }
      }}
      aria-label="Impact"
      valueLabelDisplay="auto"
    />
      <div className="font-medium text-gray-700">
        Environmental Impact: {environmentalImpact}
      </div>
    <Slider
      value={environmentalImpact}
      onChange={(e, newValue) => {
        if (typeof newValue === 'number') {
          setEnvironmentalImpact(newValue);
        }
      }}
      aria-label="Environmental Impact"
      valueLabelDisplay="auto"
    />
  </form>
  {sortedDb && (
  <div className="options-container">
    <h1>Top 3 Options</h1>
    <div className="options-grid">
      {sortedDb.slice(0, 3).map((option, index) => (
        <div key={index} className="card">
          <h2>Option {option.ID}</h2>
          <div className="pentagon-container">
            <Pentagon
              creativity={option.N}
              feasibility={option.F}
              management={option.M}
              impact={option.I}
              environmentalImpact={option.E}
            />
          </div>
          <p>Overall Score: {option.Overall.toFixed(2)}</p>
          <p>Aproximate Cost: {option.TC.toFixed(2)}</p>
          {/* Add other statistics you want to display */}
        </div>
      ))}
    </div>
  </div>
)}


    </main>
  )
}
