import { useEffect, useState } from "react";

const useTimer = (level: string, isGameStarted: boolean) => {
  const [timer, setTimer] = useState(60);
  const [timeAsLevel, setTimeAsLevel] = useState(60);
  const [changeInTime, setChangeInTime] = useState(1000);

  useEffect(() => {
    const t = level === "easy" ? 60 : level === "medium" ? 120 : 180;
    setTimer(t);
    setTimeAsLevel(t);
  }, [level]);

  useEffect(() => {
    if (isGameStarted && timer > 0) {
      const timerInterval = setTimeout(() => {
        setTimer((prev) => prev - 1);
      }, changeInTime);
      return () => clearTimeout(timerInterval);
    }
  }, [timer, isGameStarted, changeInTime]);

  return { timer, setTimer, timeAsLevel, setChangeInTime };
};

export default useTimer;
