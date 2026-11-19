import React, { useEffect } from 'react';
import { FaClock, FaExclamationTriangle } from 'react-icons/fa';

/**
 * Timer component maintains 60-minute countdown timer.
 * Triggers onExpire callback automatically when reaching 00:00.
 */
const Timer = ({ secondsLeft, setSecondsLeft, onExpire }) => {

  useEffect(() => {
    if (secondsLeft <= 0) {
      onExpire();
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, setSecondsLeft, onExpire]);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMins = String(minutes).padStart(2, '0');
    const formattedSecs = String(seconds).padStart(2, '0');
    return `${formattedMins}:${formattedSecs}`;
  };

  const isLowTime = secondsLeft < 300; // less than 5 minutes

  return (
    <div
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm sm:text-base font-bold shadow-xs transition-colors ${
        isLowTime
          ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse'
          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
      }`}
    >
      {isLowTime ? (
        <FaExclamationTriangle className="text-rose-600 animate-bounce" />
      ) : (
        <FaClock className="text-emerald-600" />
      )}
      <span>{formatTime(secondsLeft)}</span>
      <span className="text-[10px] uppercase font-sans tracking-wide text-slate-500 font-semibold hidden sm:inline">
        Remaining
      </span>
    </div>
  );
};

export default Timer;
