import { useEffect, useState } from "react";

const useScore = (level: string, movesCount: number, timeCount: number) => {
  const [score, setScore] = useState(1000);
  const [currLevel, setLevel] = useState("");

  useEffect(() => {
    setLevel(level);
    setTimeout(() => {
      switch (currLevel) {
        case "easy": {
          let s = 1000;
          if (movesCount > 12) s -= 20 * (movesCount - 12);
          if (timeCount > 30) s -= 10 * (timeCount - 30);
          setScore(Math.max(0, s));
          break;
        }
        case "medium": {
          let s = 1500;
          if (movesCount > 24) s -= 15 * (movesCount - 24);
          if (timeCount > 60) s -= 5 * (timeCount - 60);
          setScore(Math.max(0, s));
          break;
        }
        case "difficult": {
          let s = 2000;
          if (movesCount > 40) s -= 10 * (movesCount - 40);
          if (timeCount > 90) s -= 5 * (timeCount - 90);
          setScore(Math.max(0, s));
          break;
        }
        default:
          break;
      }
    }, 1500);
  }, [currLevel, movesCount, timeCount]);

  return { score };
};

export default useScore;
