"use client";

import Image from 'next/image'
import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import Papa from 'papaparse'

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
      assistantFormData.append('instructions', "idkrn");
      assistantFormData.append('threadId', threadId);
      assistantFormData.append('assistantId', process.env.NEXT_PUBLIC_REACT_APP_ASSISTANT_ID);

      await fetch('/api/assistant/run', {
        method: 'POST',
        body: assistantFormData,
      });

      // Wait for a moment to ensure the assistant has time to process
      // await new Promise(resolve => setTimeout(resolve, 6000)); // Adjust time as needed

      // Fetch the messages
      const timeoutDuration = 30000; // Timeout duration in milliseconds, e.g., 30000 for 30 seconds
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

  console.log()


  const [file, setFile] = useState(null);

  const [creativity, setCreativity] = useState(50);
  const [feasibility, setFeasibility] = useState(50);
  const [management, setManagement] = useState(50);
  const [impact, setImpact] = useState(50);
  const [environmentalImpact, setEnvironmentalImpact] = useState(50);

  const handleFileChange = async (event) => {
  const uploadedFile = event.target.files[0];
  setFile(uploadedFile);




  const answers = [];
  Papa.parse(uploadedFile, {
    complete: async (result) => {
      for (const data of result.data) {
        console.log(data);
        const msg = "Summarize the following idea: " + data["solution"];

        answers.push(await startAndAsk(msg));
        await new Promise(resolve => setTimeout(resolve, 100));




      }
      // wait timeout time + intervalTime x submissionCount
      await new Promise(resolve => setTimeout(resolve, 500000));
      console.log("final answers: ");
      console.log(answers);
    },
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    error: (error) => {
      console.error('Error parsing CSV:', error);
    }
  });

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

    </main>
  )
}
