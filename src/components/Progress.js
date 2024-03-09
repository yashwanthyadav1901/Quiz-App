import React from "react";

const Progress = ({ index, numOfQuestions, points, maxPoints, answer }) => {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        <strong>question : </strong>
        {index + 1}/{numOfQuestions}
      </p>
      <p>
        <strong>points : </strong> {points}/ {maxPoints}
      </p>
    </header>
  );
};

export default Progress;
