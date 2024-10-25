"use client";

import Image from "next/image";
//images
import whatsapp from "@/assets/whatsapp.png";
import cyclops from "@/assets/cyclops.png";
import love from "@/assets/love.png";
import add from "@/assets/add.png";
import lemon from "@/assets/lemon.png";
import bongo from "@/assets/bongo.png";
import brain from "@/assets/brain.png";
import coconut from "@/assets/coconut.png";
import discoball from "@/assets/discoball.png";
import camera from "@/assets/camera.png";
import cake from "@/assets/cake.png";
import bitcoin from "@/assets/bitcoin.png";
import earth from "@/assets/earth.jpg";
import shirt from "@/assets/shirt.png";
import butterfly from "@/assets/butterfly.png";
import valentin from "@/assets/valentin.png";
import wave from "@/assets/wave.png";
import festival from "@/assets/festival.png";
import a from "@/assets/a.png";
import s from "@/assets/s.png";
import calendar from "@/assets/calendar.png";
import cow from "@/assets/cow.png";
import microphone from "@/assets/microphone.png";
import nowar from "@/assets/nowar.png";
import police from "@/assets/police.png";
import soccer from "@/assets/soccer.png";
import toothbrush from "@/assets/toothbrush.png";
import watertap from "@/assets/watertap.png";
import link from "@/assets/link.png";
import paint from "@/assets/paint.png";
import burger from "@/assets/burger.png";
import balloons from "@/assets/balloons.png";

import { useEffect, useState } from "react";
import useTimer from "@/hooks/Timer";
import useScore from "@/hooks/Score";

export default function Game() {
  // total tiles info
  const tiles = [
    {
      id: 1,
      item: "love",
      image: love,
    },
    {
      id: 2,
      item: "whatsapp",
      image: whatsapp,
    },
    {
      id: 3,
      item: "brain",
      image: brain,
    },
    {
      id: 4,
      item: "lemon",
      image: lemon,
    },
    {
      id: 5,
      item: "add",
      image: add,
    },
    {
      id: 6,
      item: "cyclops",
      image: cyclops,
    },
    {
      id: 7,
      item: "discoball",
      image: discoball,
    },
    {
      id: 8,
      item: "coconut",
      image: coconut,
    },
    {
      id: 9,
      item: "cake",
      image: cake,
    },
    {
      id: 10,
      item: "shirt",
      image: shirt,
    },
    {
      id: 11,
      item: "bongo",
      image: bongo,
    },
    {
      id: 12,
      item: "festival",
      image: festival,
    },
    {
      id: 13,
      item: "earth",
      image: earth,
    },
    {
      id: 14,
      item: "camera",
      image: camera,
    },
    {
      id: 15,
      item: "valentin",
      image: valentin,
    },
    {
      id: 16,
      item: "wave",
      image: wave,
    },
    {
      id: 17,
      item: "butterfly",
      image: butterfly,
    },
    {
      id: 18,
      item: "bitcoin",
      image: bitcoin,
    },
    {
      id: 19,
      item: "watertap",
      image: watertap,
    },
    {
      id: 20,
      item: "paint",
      image: paint,
    },
    {
      id: 21,
      item: "nowar",
      image: nowar,
    },
    {
      id: 22,
      item: "microphone",
      image: microphone,
    },
    {
      id: 23,
      item: "soccer",
      image: soccer,
    },
    {
      id: 24,
      item: "toothbrush",
      image: toothbrush,
    },
    {
      id: 25,
      item: "police",
      image: police,
    },
    {
      id: 26,
      item: "link",
      image: link,
    },
    {
      id: 27,
      item: "cow",
      image: cow,
    },
    {
      id: 28,
      item: "burger",
      image: burger,
    },
    {
      id: 29,
      item: "s",
      image: s,
    },
    {
      id: 30,
      item: "calendar",
      image: calendar,
    },
    {
      id: 31,
      item: "balloons",
      image: balloons,
    },
    {
      id: 32,
      item: "a",
      image: a,
    },
  ];

  const [currTilePairs, setTilePairs] = useState({
    currTilesNo: 8 * 2,
    level: "easy",
  });
  const [finalTilesList, setFinalTilesList] = useState<object[]>([]);
  const [clickedTiles, setClickedTiles] = useState<number[]>([]);
  const [item, setItem] = useState({
    prev: null as number | null,
    curr: null as number | null,
  });
  const [movesCount, setMovesCount] = useState<number>(0);
  const [timeCount, setTimeCount] = useState<number>(0);
  const [remainingHints, setRemainingHints] = useState<number>(3);
  // const [matchingSequence, setMatchingSequence] = useState<number[]>([]);

  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameEnd, setGameEnd] = useState(false);

  //fetching timer from timer hook
  const { timer, setTimer, timeAsLevel, setChangeInTime } = useTimer(
    currTilePairs.level,
    isGameStarted
  );

  //fetching score from score hook
  const { score } = useScore(
    currTilePairs.level,
    movesCount,
    timeAsLevel - timeCount
  );

  //start the game
  const startGame = () => {
    setClickedTiles([]);
    setTimer(timeAsLevel);
    setGameEnd(false);
    setGameStarted(true);
    setMovesCount(0);
    setTimeCount(0);
  };

  //give hint (reveal card for some seconds)
  const giveHint = () => {
    if (remainingHints > 0) {
      setRemainingHints((prev) => prev - 1);
      const currentClickedTiles = clickedTiles;
      setTimeout(() => {
        setClickedTiles((prev) => [
          ...prev,
          ...finalTilesList.map((ftl) => ftl.uniqueId),
        ]);
      }, 500);

      setTimeout(() => {
        setClickedTiles([...currentClickedTiles]);
      }, 1000);
    } else {
      return;
    }
  };

  //freeze time for some seconds
  const freezeTimer = () => {
    switch (timeAsLevel) {
      case 60:
        const timeChangeTimeout = setTimeout(() => {
          console.log("Time freezer on");
          setChangeInTime(3000);
        }, 100);

        setTimeout(() => {
          clearTimeout(timeChangeTimeout);
          console.log("Time freezer off");
          setChangeInTime(1000);
        }, 9000);
        break;
      case 120:
        const timeChangeTimeout2 = setTimeout(() => {
          console.log("Time freezer on");
          setChangeInTime(3500);
        }, 100);

        setTimeout(() => {
          clearTimeout(timeChangeTimeout2);
          console.log("Time freezer off");
          setChangeInTime(1000);
        }, 9500);
        break;
      case 180:
        const timeChangeTimeout3 = setTimeout(() => {
          console.log("Time freezer on");
          setChangeInTime(4000);
        }, 100);

        setTimeout(() => {
          clearTimeout(timeChangeTimeout3);
          console.log("Time freezer off");
          setChangeInTime(1000);
        }, 10000);
        break;
      default:
        break;
    }
  };

  //setting the level on button click
  const setTilesCount = (tiles: number) => {
    const tileCount = tiles;
    setTilePairs({
      currTilesNo: tileCount,
      level: tiles === 16 ? "easy" : tiles === 36 ? "medium" : "difficult",
    });
    setGameStarted(false);
  };

  //suffling tiles
  const shuffleTiles = (tilesArray: object[]) => {
    // console.log(tilesArray);
    const shuffledArray = [...tilesArray];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    console.log("Shuffled Array : ", shuffledArray);
    setFinalTilesList(shuffledArray);
    setClickedTiles([]);
    setItem({ prev: null, curr: null });
    setMovesCount(0);
  };

  // making final pairs
  useEffect(() => {
    //setting tiles list based on level
    const tilesList = tiles.slice(0, currTilePairs.currTilesNo / 2);
    const currFinalTilesList = [...tilesList, ...tilesList].map(
      (tile, index) => ({
        ...tile,
        uniqueId: index,
      })
    );
    shuffleTiles(currFinalTilesList);
  }, [currTilePairs]);

  //reveal items on tiles click
  const itemSet = (event: MouseEvent, uniqueId: number) => {
    if (timer === 0 || timer === 60 || timer === 120 || timer === 180) {
      //preventing to click on tiles
      event?.preventDefault();
      event?.stopPropagation();
    } else {
      console.log("ID", uniqueId);
      //checking if same tile is clicked consequetively
      if (item.prev !== null && item.prev === uniqueId) {
        return;
      }
      if (item.prev === null) {
        setItem({ ...item, prev: uniqueId });
        setClickedTiles((prev) => [...prev, uniqueId]);
      } else {
        setItem({ ...item, curr: uniqueId });
        setClickedTiles((prev) => [...prev, uniqueId]);
      }
    }
  };

  //matching
  useEffect(() => {
    if (item.prev !== null && item.curr !== null) {
      //increase number of moves
      setMovesCount((prev) => prev + 1);

      //finding previous tiles's unique id
      const prevTile = finalTilesList.find(
        (tile) => tile.uniqueId === item.prev
      );
      //finding current tiles's unique id
      const currTile = finalTilesList.find(
        (tile) => tile.uniqueId === item.curr
      );
      //checking if id matches
      if (prevTile && currTile && prevTile.id === currTile.id) {
        console.log("Matched");
      } else {
        console.log("Not Matched");

        //reseting the tiles pair off if not matches
        setTimeout(() => {
          setClickedTiles((prevClicked) =>
            prevClicked.filter((ct) => ct !== item.prev && ct !== item.curr)
          );
        }, 800);
      }
      //setting the value to null again
      setItem({ prev: null, curr: null });
    }

    //checking if all tiles have been matched
    if (
      clickedTiles.length === finalTilesList.length &&
      clickedTiles.length !== 0 &&
      finalTilesList.length !== 0
    ) {
      setTimeCount(timer);
      setGameEnd(true);
      setGameStarted(false);
    }
  }, [item]);

  //end the game when timer is 0
  useEffect(() => {
    //checking if time is up
    if (timer === 0) {
      console.log("The game has ended");
      setGameEnd(true);
      setGameStarted(false);
    }
  }, [timer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      {/* set tiles to 16,36,64 */}
      <div className="w-full flex justify-center gap-x-5">
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={() => setTilesCount(16)}
        >
          Easy
        </button>
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={() => setTilesCount(36)}
        >
          Medium
        </button>
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={() => setTilesCount(64)}
        >
          Difficult
        </button>
      </div>
      {/* timer div */}
      <div className="w-full flex justify-center gap-x-5">
        {isGameStarted && <p>Time Left : {timer}</p>}
      </div>
      {/* shuffle tiles button, start button, hint button, freeze time button */}
      <div className="w-full flex justify-center gap-x-5">
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={() => shuffleTiles(finalTilesList)}
        >
          Shuffle
        </button>
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={startGame}
        >
          Start
        </button>
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={giveHint}
        >
          Hint {remainingHints}
        </button>
        <button
          className="px-10 py-4 bg-slate-400 rounded-lg"
          onClick={freezeTimer}
        >
          Freeze Time
        </button>
      </div>
      {/* count number of moves */}
      <div className="w-full flex justify-center gap-x-5">
        Total moves : {movesCount}
      </div>
      {/* solved modal */}
      <div className="w-full flex justify-center gap-x-5">
        {isGameEnd &&
          `${
            movesCount > 0
              ? clickedTiles.length === finalTilesList.length
                ? `SOLVED !!! YOU TOOK ${movesCount} MOVES AND ${
                    timeAsLevel - timeCount
                  } SECONDS TO COMPLETE IT !! CONGRATS !! YOUR SCORE IS ${score}`
                : `TIME UP !! YOU TOOK ${movesCount} MOVES ! TRY AGAIN !`
              : "TIME UP !! YOU DIDN'T PLAYED A SINGLE MOVE !"
          }`}
      </div>
      {/* tiles section */}
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <div
          className={`grid ${
            currTilePairs.currTilesNo === 16
              ? "grid-cols-4 grid-rows-4"
              : currTilePairs.currTilesNo === 36
              ? "grid-cols-6 grid-rows-6"
              : "grid-cols-8 grid-rows-8"
          } text-center gap-3`}
        >
          {finalTilesList.map((tile) => (
            <div
              key={tile.uniqueId}
              className={`relative w-20 h-20 p-5 bg-black text-white ${
                timer === 0 || !isGameStarted
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={(event) => itemSet(event, tile.uniqueId)}
            >
              <div
                className={`absolute w-20 top-0 left-0 bg-green-500 transition-all ease-in-out duration-200 ${
                  !clickedTiles.includes(tile.uniqueId) ? "h-20" : "h-0"
                }`}
              ></div>
              <Image src={tile.image || "#"} alt="" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
