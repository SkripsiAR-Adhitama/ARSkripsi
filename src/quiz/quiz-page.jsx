import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Game from "./game";
import  "../quiz/style/quiz-page.css";

function QuizPage() {
  const location = useLocation();
  const { playerName = "Guest", numQuestions = 20 } = location.state || {};
  const [isFinished, setIsFinished] = useState(false);
  const [showBackModal, setShowBackModal] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (!isFinished) {
        e.preventDefault();
        e.returnValue = "Progres akan hilang! Yakin ingin mengulang?"; 
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isFinished]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (!isFinished) {
        window.history.pushState(null, "", window.location.href);
        setShowBackModal(true);
      }
    };

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [isFinished]);

  return (
    <main>
      <Game 
        playerName={playerName} 
        numQuestions={numQuestions} 
        onGameFinish={() => setIsFinished(true)} 
      />

      {showBackModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>⚠️ Perhatian</h3>
            <p>Selesaikan kuis terlebih dahulu sebelum kembali!</p>
            <button 
              className="modal-button" 
              onClick={() => setShowBackModal(false)}
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default QuizPage;