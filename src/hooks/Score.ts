import { useEffect, useState } from "react";

const useScore = (level: string, movesCount: number, timeCount: number) => {
  const [score, setScore] = useState(1000);
  const [currLevel, setLevel] = useState("");

  //setting base point according to level
  useEffect(() => {
    setLevel(level);
    setTimeout(() => {
      switch (currLevel) {
        case "easy":
          let score = 1000;
          if (movesCount > 12) {
            score -= 20 * (movesCount - 12);
          }
          if (timeCount > 30) {
            score -= 10 * (timeCount - 30);
          }
          setScore(score);
          break;
        case "medium":
          let score2 = 1500;
          if (movesCount > 24) {
            score2 -= 15 * (movesCount - 24);
          }
          if (timeCount > 60) {
            score2 -= 5 * (timeCount - 60);
          }
          setScore(score2);
          break;
        case "difficult":
          let score3 = 2000;
          if (movesCount > 40) {
            score3 -= 10 * (movesCount - 40);
          }
          if (timeCount > 90) {
            score3 -= 5 * (timeCount - 90);
          }
          setScore(score3);
          break;
        default:
          break;
      }
    }, 1500);
  }, [currLevel, movesCount, timeCount]);

  return { score };
};

export default useScore;
