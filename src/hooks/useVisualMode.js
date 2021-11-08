import { useState } from "react";


//Func. that changes the state array 
export default function useVisualMode(initial) {
  
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setHistory((prev) => {
      if (replace === true) {
        const newHistory = [...history];
        newHistory.pop();
        return [...newHistory, newMode];
      }
      return [...prev, newMode];
    });
   
  };

  const back = () => {
    console.log("HISTORY", history)
    if (history.length < 1) {
      return;
    }
    setHistory((prev) => {
      prev.pop();
      return [...prev];
    });

  };
  //Last item in the array is always the current mode 
  const mode = history[history.length - 1]
  return { mode, transition, back };
}