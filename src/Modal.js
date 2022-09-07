import React from "react";
import { useGlobalContext } from "./context";
const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();

  console.log(isModalOpen);
  return (
    <main>
      <div
        className={`${
          isModalOpen ? "modal-container isOpen" : "modal-container"
        }`}
      >
        <div className="modal-content">
          <h2>congrats!</h2>
          <p>
            you've got {correct} wins out of {questions.length} Qs!
          </p>
          <button className="close-btn" onClick={closeModal}>
            play again
          </button>
        </div>
      </div>
    </main>
  );
};

export default Modal;
