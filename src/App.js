import React, { useState } from "react";
import { data } from "./QuizData";

const App = () => {
  const [showStatus, setShowStatus] = useState(false);
  const questions = data.questions ? data.questions : "";
  const title = data.title;
  const url = data?.url;
  const arrObj = React.useRef(
    Object.fromEntries(questions.map(({ id }) => [id, {}]))
  );
  console.log(arrObj);
  const handleDraftAnswer = (question, answer) => {
    arrObj.current[question.id] = {
      ...answer,
      feedback: answer.is_true
        ? question.feedback_true
        : question.feedback_false,
    };
  };
  return (
    <div className="container mx-auto px-4  d-flex flex-col">
      {title && (
        <div className="header d-flex justify-center text-center ">
          <h1 className="font-bold text-3xl lg:text-xl">{title}</h1>
        </div>
      )}
      {!!questions.length && (
        <div className="questions-wrapper bg-slate-400 mt-10 rounded-md">
          <div className="questions-list px-6 text-stone-900 text-bold text-3xl d-flex flex-col py-4">
            {questions.map((question) => (
              <div key={question?.id} className="question grid gap-y-4 mb-16">
                {question?.text && <p>{question.text}</p>}
                {!!question?.answers?.length && (
                  <div
                    className={`flex ${
                      question.answers.length > 2
                        ? "justify-between"
                        : "justify-center gap-10"
                    } flex-col lg:flex-row w-100  text-lg text-rose-900 border-2 p-3 `}
                  >
                    {question.answers.map((answer) => (
                      <p
                        className="cursor-pointer hover:text-white"
                        key={answer?.id}
                        onClick={() => handleDraftAnswer(question, answer)}
                      >
                        {answer.text}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded-md flex text-center justify-center mx-auto mt-10 w-[80%]"
        onClick={(e) => {
          setShowStatus(true);
        }}
      >
        Submit
      </button>

      {showStatus && (
        <>
          <div className="flex flex-col justify-center gap-6 mt-10 bg-slate-400 p-6 rounded-md text-xl font-semibold">
            {Object.entries(arrObj.current).map(([id, { feedback }]) => (
              <div key={id} className=" flex">
                <p>{feedback}</p>
              </div>
            ))}
          </div>

          <a href={url}>
            <div className="flex justify-center mt-10 bg-slate-900 text-white py-10 rounded-md text-3xl cursor-pointer capitalize shadow-lg hover:bg-red-600">
              <p> click here for the youtube video </p>
            </div>
          </a>
        </>
      )}
    </div>
  );
};

export default App;
