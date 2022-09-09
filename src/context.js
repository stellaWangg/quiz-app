import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
const AppContext = React.createContext();
const API_ENDPOINT = `https://opentdb.com/api.php?`;

const numForCtgr = {
  music: 12,
  film: 11,
  politics: 24,
};

const AppProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [startForm, setStartForm] = useState(true);
  const [index, setIndex] = useState(0);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "film",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setIsModalOpen(false);
    setStartForm(true);
    const resp = await axios(url).catch((error) => console.log(error));
    console.log(resp);
    if (resp) {
      const data = resp.data.results;
      console.log(data);
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setStartForm(false);
        setError(false);
      } else {
        setStartForm(true);
        setError(true);
      }
    } else {
      setStartForm(true);
    }
  };
  const nextQueFunc = () => {
    setIndex((prevQue) => {
      const index = prevQue + 1;
      if (index > questions.length - 1) {
        openModal();
        return 0;
      } else {
        return index;
      }
    });
  };
  const checkAnswers = (value) => {
    if (value) {
      setCorrect((oldNum) => oldNum + 1);
    }
    nextQueFunc();
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
    console.log(e);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { category, amount, difficulty } = quiz;
    const url = `${API_ENDPOINT}amount=${amount}&category=${numForCtgr[category]}&difficulty=${difficulty}&type=multiple`;
    fetchQuestions(url);
  };
  const closeModal = () => {
    setStartForm(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        quiz,
        isModalOpen,
        setIsModalOpen,
        error,
        setError,
        loading,
        setLoading,
        setQuiz,
        startForm,
        setStartForm,
        handleChange,
        handleSubmit,
        correct,
        setCorrect,
        questions,
        setQuestions,
        index,
        setIndex,
        fetchQuestions,
        nextQueFunc,
        checkAnswers,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext };
