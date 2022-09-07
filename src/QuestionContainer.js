import { useGlobalContext } from "./context";
import React from "react";
import Modal from "./Modal";
const QuestionContainer = () => {
  const { questions, correct, index, checkAnswers, nextQueFunc, isModalOpen } =
    useGlobalContext();
  console.log(questions);
  const { incorrect_answers, correct_answer, question } = questions[index];
  console.log(incorrect_answers);
  let answers = [...incorrect_answers];
  const randomNum = Math.floor(Math.random() * 4);
  if (randomNum === 3) {
    answers.push(correct_answer);
  } else {
    answers.push(answers[randomNum]);
    answers[randomNum] = correct_answer;
  }
  return (
    <section className="answers-page">
      <p className="correct-answer">
        Correct: {correct}/{index}
      </p>
      <h1 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answer-container">
        {answers.map((singleAnswer, i) => {
          return (
            <button
              key={i}
              dangerouslySetInnerHTML={{ __html: singleAnswer }}
              className="answer-btn"
              onClick={() => checkAnswers(correct_answer === singleAnswer)}
            />
          );
        })}
      </div>
      <button className="next-btn" onClick={nextQueFunc}>
        Next Question
      </button>
      {isModalOpen && <Modal />}
    </section>
  );
};

export default QuestionContainer;
