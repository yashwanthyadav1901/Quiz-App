import React, { useEffect } from "react";

const Timer = ({ dispatch, remainingSeconds }) => {
  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  useEffect(
    function () {
      const timer = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);

      return () => clearInterval(timer);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 ? 0 : ""}
      {min}:{sec < 10 ? 0 : ""}
      {sec}
    </div>
  );
};

export default Timer;
