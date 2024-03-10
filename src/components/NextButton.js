import React from "react";

const NextButton = ({ dispatch, answer, numOfQuestions, index }) => {
  if (answer === null) return null;
  if (index + 1 < numOfQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "nextQuestion" });
        }}
      >
        Next
      </button>
    );

  if (index + 1 === numOfQuestions) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "Finished" });
        }}
      >
        Finish
      </button>
    );
  }
};

export default NextButton;
