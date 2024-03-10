import React from "react";

const FinishedPage = ({ points, maxPoints, dispatch, highScore }) => {
  const percentage = (points / maxPoints) * 100;
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of{" "}
        <strong>
          {maxPoints}({Math.ceil(percentage)}%)🎉🎉🎉
        </strong>
      </p>
      <p className="highscore">
        Highscore : <strong>{highScore}</strong>
      </p>

      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishedPage;
