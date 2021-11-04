import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
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
    setMode(newMode);
  };

  const back = () => {
    if (history.length < 1) {
      return;
    }
    setHistory((prev) => {
      prev.pop();
      return [...prev];
    });
    setMode(history[history.length - 2]);
  };
  return { mode, transition, back };
}
