import React from "react";
import { useGlobalContext } from "./context";

const MainPage = () => {
  const { handleChange, handleSubmit, quiz } = useGlobalContext();
  return (
    <section className="question">
      <form className="question-form">
        <h2>Quiz time!</h2>
        {/* category */}
        <div className="form-control">
          <label htmlFor="category">choose a category</label>
          <select
            name="category"
            id="category"
            className="form-input"
            onChange={handleChange}
            value={quiz.category}
          >
            <option value="music">Music</option>
            <option value="film">film</option>
            <option value="politics">politics</option>
          </select>
        </div>
        {/* difficulty */}
        <div className="form-control">
          <label htmlFor="difficulty">choose level of hard</label>
          <select
            name="difficulty"
            id="difficulty"
            className="form-input"
            onChange={handleChange}
            value={quiz.difficulty}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="difficult">difficult</option>
          </select>
        </div>
        {/* number of Qs */}
        <div className="form-control">
          <label htmlFor="amount">choose amount of Qs</label>
          <input
            type="number"
            name="category"
            className="form-input"
            onChange={handleChange}
            value={quiz.amount}
            min={1}
            max={50}
          />
        </div>
        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Generate Questions
        </button>
      </form>
    </section>
  );
};

export default MainPage;
