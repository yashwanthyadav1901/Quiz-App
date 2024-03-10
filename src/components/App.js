import { useEffect, useReducer } from "react";
import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import NextButton from "./NextButton";
import FinishedPage from "./FinishedPage";
import Timer from "./Timer";
import Footer from "./Footer";

const intialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: null,
};

const Secs_per_Que = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "start",
        remainingSeconds: state.questions.length * Secs_per_Que,
      };
    case "answer":
      return { ...state };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,

        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "Finished":
      return {
        ...state,
        status: "Finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...intialstate,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        remainingSeconds: state.remainingSeconds - 1,
        status: state.remainingSeconds === 0 ? "Finished" : state.status,
      };

    default:
      throw new Error("error");
  }
}

function App() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, intialstate);

  const numOfQuestions = questions.length;

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  const maxPoints = questions.reduce((prev, curr) => {
    return prev + curr.points;
  }, 0);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Progress
              index={index}
              numOfQuestions={numOfQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numOfQuestions={numOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === "Finished" && (
          <FinishedPage
            points={points}
            maxPoints={maxPoints}
            dispatch={dispatch}
            highScore={highScore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
