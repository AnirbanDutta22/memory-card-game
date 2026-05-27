"use client";

import Image from "next/image";
import styles from "./page.module.css";

// images
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

const ALL_TILES = [
  { id: 1, item: "love", image: love },
  { id: 2, item: "whatsapp", image: whatsapp },
  { id: 3, item: "brain", image: brain },
  { id: 4, item: "lemon", image: lemon },
  { id: 5, item: "add", image: add },
  { id: 6, item: "cyclops", image: cyclops },
  { id: 7, item: "discoball", image: discoball },
  { id: 8, item: "coconut", image: coconut },
  { id: 9, item: "cake", image: cake },
  { id: 10, item: "shirt", image: shirt },
  { id: 11, item: "bongo", image: bongo },
  { id: 12, item: "festival", image: festival },
  { id: 13, item: "earth", image: earth },
  { id: 14, item: "camera", image: camera },
  { id: 15, item: "valentin", image: valentin },
  { id: 16, item: "wave", image: wave },
  { id: 17, item: "butterfly", image: butterfly },
  { id: 18, item: "bitcoin", image: bitcoin },
  { id: 19, item: "watertap", image: watertap },
  { id: 20, item: "paint", image: paint },
  { id: 21, item: "nowar", image: nowar },
  { id: 22, item: "microphone", image: microphone },
  { id: 23, item: "soccer", image: soccer },
  { id: 24, item: "toothbrush", image: toothbrush },
  { id: 25, item: "police", image: police },
  { id: 26, item: "link", image: link },
  { id: 27, item: "cow", image: cow },
  { id: 28, item: "burger", image: burger },
  { id: 29, item: "s", image: s },
  { id: 30, item: "calendar", image: calendar },
  { id: 31, item: "balloons", image: balloons },
  { id: 32, item: "a", image: a },
];

type TileWithUniqueId = (typeof ALL_TILES)[0] & { uniqueId: number };

const LEVELS = [
  { label: "Easy", tiles: 16, key: "easy" },
  { label: "Medium", tiles: 36, key: "medium" },
  { label: "Hard", tiles: 64, key: "difficult" },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Game() {
  const [currLevel, setCurrLevel] = useState({ tilesNo: 16, level: "easy" });
  const [finalTilesList, setFinalTilesList] = useState<TileWithUniqueId[]>([]);
  const [clickedTiles, setClickedTiles] = useState<number[]>([]);
  const [item, setItem] = useState<{
    prev: number | null;
    curr: number | null;
  }>({ prev: null, curr: null });
  const [movesCount, setMovesCount] = useState(0);
  const [timeCount, setTimeCount] = useState(0);
  const [remainingHints, setRemainingHints] = useState(3);
  const [isGameStarted, setGameStarted] = useState(false);
  const [isGameEnd, setGameEnd] = useState(false);
  const [isFreezing, setIsFreezing] = useState(false);
  const [wrongPair, setWrongPair] = useState<number[]>([]);

  const { timer, setTimer, timeAsLevel, setChangeInTime } = useTimer(
    currLevel.level,
    isGameStarted,
  );
  const { score } = useScore(
    currLevel.level,
    movesCount,
    timeAsLevel - timeCount,
  );

  const timerPercent =
    timeAsLevel > 0 ? Math.round((timer / timeAsLevel) * 100) : 100;
  const isWarning = timerPercent <= 25;
  const cols = currLevel.tilesNo === 16 ? 4 : currLevel.tilesNo === 36 ? 6 : 8;

  const buildTileList = (tilesNo: number) => {
    const pairs = ALL_TILES.slice(0, tilesNo / 2);
    return shuffle(
      [...pairs, ...pairs].map((tile, idx) => ({ ...tile, uniqueId: idx })),
    );
  };

  const startGame = (tilesNo?: number) => {
    const count = tilesNo ?? currLevel.tilesNo;
    setFinalTilesList(buildTileList(count));
    setClickedTiles([]);
    setItem({ prev: null, curr: null });
    setMovesCount(0);
    setTimeCount(0);
    setRemainingHints(3);
    setTimer(timeAsLevel);
    setGameEnd(false);
    setGameStarted(true);
  };

  const changeLevel = (tilesNo: number, level: string) => {
    setCurrLevel({ tilesNo, level });
    setFinalTilesList(buildTileList(tilesNo));
    setGameStarted(false);
    setGameEnd(false);
    setClickedTiles([]);
    setMovesCount(0);
    setItem({ prev: null, curr: null });
  };

  const shuffleCurrent = () => {
    if (!isGameStarted) return;
    const matched = clickedTiles.filter((id) => {
      const tile = finalTilesList.find((t) => t.uniqueId === id);
      if (!tile) return false;
      const partner = finalTilesList.find(
        (t) => t.id === tile.id && t.uniqueId !== tile.uniqueId,
      );
      return partner && clickedTiles.includes(partner.uniqueId);
    });
    const unmatched = finalTilesList.filter(
      (t) => !matched.includes(t.uniqueId),
    );
    const remaining = finalTilesList.filter((t) =>
      matched.includes(t.uniqueId),
    );
    setFinalTilesList(shuffle([...remaining, ...shuffle(unmatched)]));
    setClickedTiles([...matched]);
    setItem({ prev: null, curr: null });
  };

  const giveHint = () => {
    if (remainingHints <= 0 || !isGameStarted) return;
    setRemainingHints((prev) => prev - 1);
    const snapshot = [...clickedTiles];
    setClickedTiles(finalTilesList.map((t) => t.uniqueId));
    setTimeout(() => setClickedTiles(snapshot), 900);
  };

  const freezeTimer = () => {
    if (isFreezing || !isGameStarted) return;
    setIsFreezing(true);
    const slowFactor =
      timeAsLevel === 60 ? 3000 : timeAsLevel === 120 ? 3500 : 4000;
    const duration =
      timeAsLevel === 60 ? 9000 : timeAsLevel === 120 ? 9500 : 10000;
    setChangeInTime(slowFactor);
    setTimeout(() => {
      setChangeInTime(1000);
      setIsFreezing(false);
    }, duration);
  };

  const itemSet = (uniqueId: number) => {
    if (!isGameStarted || timer === 0) return;
    if (item.prev === uniqueId) return;
    if (clickedTiles.includes(uniqueId)) return;
    if (item.prev === null) {
      setItem({ prev: uniqueId, curr: null });
      setClickedTiles((prev) => [...prev, uniqueId]);
    } else {
      setItem((prev) => ({ ...prev, curr: uniqueId }));
      setClickedTiles((prev) => [...prev, uniqueId]);
    }
  };

  useEffect(() => {
    if (item.prev !== null && item.curr !== null) {
      setMovesCount((prev) => prev + 1);
      const prevTile = finalTilesList.find((t) => t.uniqueId === item.prev);
      const currTile = finalTilesList.find((t) => t.uniqueId === item.curr);
      if (prevTile && currTile && prevTile.id === currTile.id) {
        setItem({ prev: null, curr: null });
      } else {
        setWrongPair([item.prev, item.curr]);
        setTimeout(() => {
          setClickedTiles((prevClicked) =>
            prevClicked.filter((ct) => ct !== item.prev && ct !== item.curr),
          );
          setWrongPair([]);
          setItem({ prev: null, curr: null });
        }, 700);
      }
    }
  }, [item]);

  useEffect(() => {
    if (
      finalTilesList.length > 0 &&
      clickedTiles.length === finalTilesList.length
    ) {
      setTimeCount(timer);
      setGameEnd(true);
      setGameStarted(false);
    }
  }, [clickedTiles]);

  useEffect(() => {
    if (timer === 0 && isGameStarted) {
      setGameEnd(true);
      setGameStarted(false);
    }
  }, [timer]);

  const won =
    clickedTiles.length === finalTilesList.length && finalTilesList.length > 0;

  const formatTime = (t: number) => {
    const m = Math.floor(t / 60);
    const sec = t % 60;
    return m > 0 ? `${m}:${sec.toString().padStart(2, "0")}` : `${sec}`;
  };

  const cardSizeClass =
    currLevel.tilesNo === 16
      ? styles.cardEasy
      : currLevel.tilesNo === 36
        ? styles.cardMedium
        : styles.cardHard;
  const imgSize =
    currLevel.tilesNo === 16 ? 44 : currLevel.tilesNo === 36 ? 36 : 28;

  return (
    <div className={styles.pageWrapper}>
      {/* ── Header ── */}
      <header className="w-full max-w-5xl px-6 pt-8 pb-4 flex items-center justify-between">
        <div>
          <h1
            className={`${styles.orbitron} text-2xl font-black`}
            style={{ color: "var(--neon-cyan)", letterSpacing: "0.25em" }}
          >
            MEMORA
          </h1>
          <p
            className="text-xs mt-0.5"
            style={{ color: "var(--text-dim)", letterSpacing: "0.2em" }}
          >
            MEMORY CARD GAME
          </p>
        </div>
        <div className="flex gap-2">
          {LEVELS.map((lv) => (
            <button
              key={lv.key}
              className={`${styles.levelBtn} ${currLevel.level === lv.key ? styles.levelBtnActive : ""}`}
              onClick={() => changeLevel(lv.tiles, lv.key)}
            >
              {lv.label}
            </button>
          ))}
        </div>
      </header>

      {/* ── Divider ── */}
      <div
        className="w-full max-w-5xl px-6"
        style={{ height: "1px", background: "rgba(0,229,255,0.1)" }}
      />

      {/* ── Stats row ── */}
      <div className="w-full max-w-5xl px-6 py-4 flex items-center gap-4">
        <div className={`${styles.statCard} flex-1`}>
          <div className={styles.statLabel}>Time</div>
          <div
            className={`${styles.statValue} ${isWarning ? styles.statValueWarning : ""}`}
          >
            {formatTime(timer)}
          </div>
        </div>
        <div className={`${styles.statCard} flex-1`}>
          <div className={styles.statLabel}>Moves</div>
          <div className={styles.statValue}>{movesCount}</div>
        </div>
        <div className={`${styles.statCard} flex-1`}>
          <div className={styles.statLabel}>Pairs Left</div>
          <div className={`${styles.statValue} ${styles.statValueGreen}`}>
            {finalTilesList.length > 0
              ? (finalTilesList.length - clickedTiles.length) / 2
              : currLevel.tilesNo / 2}
          </div>
        </div>

        {/* Timer bar */}
        <div className="flex-[3] flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <span
              className={`${styles.orbitron} text-xs`}
              style={{
                color: isWarning ? "var(--neon-pink)" : "var(--text-dim)",
                letterSpacing: "0.15em",
              }}
            >
              {isWarning ? "⚠ LOW TIME" : isGameStarted ? "RUNNING" : "READY"}
            </span>
            <span
              className={`${styles.orbitron} text-xs`}
              style={{
                color: isWarning ? "var(--neon-pink)" : "var(--text-dim)",
              }}
            >
              {timerPercent}%
            </span>
          </div>
          <div className={styles.timerBarTrack}>
            <div
              className={`${styles.timerBar} ${isWarning ? styles.timerBarWarning : ""}`}
              style={{ width: `${timerPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className="w-full max-w-5xl px-6 pb-5 flex gap-3 flex-wrap">
        <button
          className={`${styles.btnGlow} ${styles.btnGreen}`}
          onClick={startGame}
        >
          {isGameEnd || !isGameStarted ? "▶ Start" : "↺ Restart"}
        </button>
        <button
          className={`${styles.btnGlow} ${styles.btnCyan}`}
          onClick={shuffleCurrent}
          disabled={!isGameStarted}
        >
          ⇌ Shuffle
        </button>
        <button
          className={`${styles.btnGlow} ${styles.btnYellow}`}
          onClick={giveHint}
          disabled={!isGameStarted || remainingHints === 0}
        >
          💡 Hint ({remainingHints})
        </button>
        <button
          className={`${styles.btnGlow} ${isFreezing ? styles.btnFrozen : styles.btnPurple}`}
          onClick={freezeTimer}
          disabled={!isGameStarted || isFreezing}
        >
          {isFreezing ? "❄ Frozen!" : "❄ Freeze Time"}
        </button>
      </div>

      {/* ── Board ── */}
      <main className="relative w-full max-w-5xl px-6 pb-12 flex justify-center">
        {/* Game end overlay */}
        {isGameEnd && (
          <div className="absolute inset-0 flex items-center justify-center z-20 px-6">
            <div className={`${styles.gameEndOverlay} w-full max-w-md`}>
              {won ? (
                <>
                  <div
                    className={`${styles.orbitron} text-4xl font-black mb-2`}
                    style={{ color: "var(--neon-green)" }}
                  >
                    ✓ SOLVED
                  </div>
                  <p
                    className="text-sm mb-6"
                    style={{ color: "var(--text-dim)", letterSpacing: "0.1em" }}
                  >
                    LEVEL COMPLETE
                  </p>
                  <div className="flex gap-4 justify-center mb-6">
                    <div className={styles.statCard}>
                      <div className={styles.statLabel}>Moves</div>
                      <div className={styles.statValue}>{movesCount}</div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statLabel}>Time Used</div>
                      <div className={styles.statValue}>
                        {formatTime(timeAsLevel - timeCount)}
                      </div>
                    </div>
                    <div className={styles.statCard}>
                      <div className={styles.statLabel}>Score</div>
                      <div
                        className={`${styles.statValue} ${styles.statValueYellow}`}
                      >
                        {score}
                      </div>
                    </div>
                  </div>
                  <button
                    className={`${styles.btnGlow} ${styles.btnGreen}`}
                    onClick={startGame}
                  >
                    ↺ Play Again
                  </button>
                </>
              ) : (
                <>
                  <div
                    className={`${styles.orbitron} text-4xl font-black mb-2`}
                    style={{ color: "var(--neon-pink)" }}
                  >
                    TIME UP
                  </div>
                  <p
                    className="text-sm mb-6"
                    style={{ color: "var(--text-dim)", letterSpacing: "0.1em" }}
                  >
                    {movesCount === 0
                      ? "YOU DIDN'T MAKE A SINGLE MOVE"
                      : `YOU MADE ${movesCount} MOVE${movesCount !== 1 ? "S" : ""}`}
                  </p>
                  <button
                    className={`${styles.btnGlow} ${styles.btnPink}`}
                    onClick={startGame}
                  >
                    ↺ Try Again
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Card grid */}
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            opacity: isGameEnd ? 0.25 : 1,
            filter: isGameEnd ? "blur(2px)" : "none",
            transition: "opacity 0.3s ease, filter 0.3s ease",
          }}
        >
          {finalTilesList.map((tile) => {
            const isFlipped = clickedTiles.includes(tile.uniqueId);
            const partner = finalTilesList.find(
              (t) => t.id === tile.id && t.uniqueId !== tile.uniqueId,
            );
            const isMatched =
              isFlipped && !!partner && clickedTiles.includes(partner.uniqueId);
            const isWrong = wrongPair.includes(tile.uniqueId);
            const canClick = isGameStarted && timer > 0 && !isFlipped;

            return (
              <div
                key={tile.uniqueId}
                className={`${styles.cardWrapper} ${isMatched ? styles.cardMatched : ""} ${cardSizeClass}`}
                style={{ cursor: canClick ? "pointer" : "default" }}
                onClick={() => canClick && itemSet(tile.uniqueId)}
              >
                <div
                  className={`${styles.cardInner} ${isFlipped ? styles.cardInnerFlipped : ""}`}
                  style={{ width: "100%", height: "100%" }}
                >
                  <div
                    className={`${styles.cardFace} ${styles.cardBackFace}`}
                  />
                  <div
                    className={`${styles.cardFace} ${styles.cardFrontFace} ${isWrong ? styles.cardFrontWrong : ""}`}
                  >
                    <Image
                      src={tile.image || "#"}
                      alt={tile.item}
                      width={imgSize}
                      height={imgSize}
                      style={{
                        objectFit: "contain",
                        filter: "drop-shadow(0 0 4px rgba(0,229,255,0.3))",
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {finalTilesList.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div
              className={`${styles.orbitron} text-lg tracking-widest`}
              style={{ color: "var(--text-dim)" }}
            >
              PRESS START TO BEGIN
            </div>
            <p
              style={{
                color: "var(--text-dim)",
                fontSize: "0.8rem",
                letterSpacing: "0.15em",
              }}
            >
              SELECT A LEVEL AND HIT START
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
