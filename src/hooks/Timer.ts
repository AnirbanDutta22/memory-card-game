import { useEffect, useState } from "react";

const useTimer = (level: string, isGameStarted: boolean) => {
  //   console.log(level);
  const [timer, setTimer] = useState(60);
  const [timeAsLevel, setTimeAsLevel] = useState(60);
  const [changeInTime, setChangeInTime] = useState(1000);

  useEffect(() => {
    setTimer(level === "easy" ? 60 : level === "medium" ? 120 : 180);
    setTimeAsLevel(level === "easy" ? 60 : level === "medium" ? 120 : 180);
  }, [level]);

  //main timer countdown
  useEffect(() => {
    if (isGameStarted) {
      if (timer > 0) {
        const timerInterval = setTimeout(() => {
          setTimer((prev) => prev - 1);
        }, changeInTime);

        return () => clearTimeout(timerInterval); // Clear the interval to avoid memory leaks
      }
    }
  }, [timer, isGameStarted, changeInTime]);

  return { timer, setTimer, timeAsLevel, setChangeInTime };
};

export default useTimer;
