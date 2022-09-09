import React from "react";
import { useGlobalContext } from "./context";
import QuestionContainer from "./QuestionContainer";
import MainPage from "./MainPage";
import Loading from "./Loading";
import Modal from "./Modal";
function App() {
  const { loading, startForm, isModalOpen } = useGlobalContext();
  if (startForm) {
    return <MainPage />;
  }
  if (loading) {
    return <Loading />;
  }

  return (
    <main>
      {isModalOpen && <Modal />}
      <QuestionContainer />
    </main>
  );
}

export default App;
