import React, { useState, useEffect, useRef } from "react";
import "../quiz/style/home-quiz.css";
import { useNavigate } from "react-router-dom";
import triviaData from "./trivia-data";
import { Info } from "lucide-react";

const getBadge = (score) => {
  if (score >= 90) {
    return { title: "Quiz Master", icon: "🏆", desc: "Sangat Baik" };
  } else if (score >= 80) {
    return { title: "Expert", icon: "🥇", desc: "Baik" };
  } else if (score >= 70) {
    return { title: "Learner", icon: "🥈", desc: "Cukup" };
  } else {
    return { title: "Beginner", icon: "🥉", desc: "Perlu Bimbingan" };
  }
};

function HomeQuiz() {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showNameWarning, setShowNameWarning] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const infoRef = useRef(null);
  const numQuestions = triviaData.length;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (infoRef.current && !infoRef.current.contains(e.target)) {
        setShowInfo(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const savedScore = localStorage.getItem("quizHighScore");

    if (savedScore) {
      setHighScore(parseInt(savedScore));
    }
  }, []);

  const badge = getBadge(highScore);

  const openResetModal = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    localStorage.removeItem("quizHighScore");
    setHighScore(0);
    setShowResetModal(false);
  };

  const cancelReset = () => {
    setShowResetModal(false);
  };

  const handleStartQuiz = () => {
    if (playerName.trim() === "") {
      setShowNameWarning(true);
      return;
    }
    navigate("halaman-kuis", {
      state: {
        playerName: playerName.trim(),
        numQuestions: parseInt(numQuestions),
      },
    });
  };

  return (
    <div>
      <div className="headerWrapper">
        <button onClick={() => navigate("/")} className="backButton">
          ← Kembali
        </button>
      </div>

      <h1 className="headerTitle">Halaman Kuis</h1>

      <div className="contentBox">
        <div className="infoWrapper" ref={infoRef}>
          <button className="infoButton" onClick={() => setShowInfo(!showInfo)}>
            <Info />
          </button>

          {showInfo && (
            <div className="infoBox">
              <h4>Level Penilaian</h4>
              <p>🏆 Quiz Master (90–100) - Sangat Baik</p>
              <p>🥇 Expert (80–89) - Baik</p>
              <p>🥈 Learner (70–79) - Cukup</p>
              <p>🥉 Beginner (&lt;70) - Perlu Bimbingan</p>
              <h4>Pedoman Skor</h4>
              <p>⚠️ Skor setiap pertanyaan kuis : 4</p>
              <p>❤️ Skor setiap nyawa : 2</p>
            </div>
          )}
        </div>

        <div className="home-quiz">
          <div className="home-quiz__form">
            <div className="home-quiz__highscore">
              🏆 High Score : {highScore}
            </div>
            {/* BADGE */}
            {highScore > 0 && (
              <div className="home-quiz__badge">
                <div className="badge-icon">{badge.icon}</div>
                <div className="badge-info">
                  <h4>{badge.title}</h4>
                  <p>{badge.desc}</p>
                </div>
              </div>
            )}
            <div className="home-quiz__input-group">
              <label>Nama:</label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Masukkan nama Anda"
                maxLength={30}
              />
            </div>

            <div>Jumlah Soal : {numQuestions}</div>

            <div className="home-quiz__info">
              <p>Jumlah Nyawa ❤️ : 10</p>
            </div>
          </div>

          <div className="home-quiz__actions">
            <button className="home-quiz__button" onClick={handleStartQuiz}>
              Mulai Kuis
            </button>

            <button className="home-quiz__reset" onClick={openResetModal}>
              Reset High Score
            </button>
            {showResetModal && (
              <div className="modal-overlay">
                <div className="modal-box">
                  <h3>Reset High Score?</h3>
                  <p>High score akan dihapus.</p>

                  <div className="modal-buttons">
                    <button className="modal-confirm" onClick={confirmReset}>
                      Ya
                    </button>

                    <button className="modal-cancel" onClick={cancelReset}>
                      Batal
                    </button>
                  </div>
                </div>
              </div>
            )}
            {showNameWarning && (
              <div className="name-overlay">
                <div className="name-modal">
                  <h2>⚠️ Nama Belum Diisi</h2>
                  <p>Silakan masukkan nama terlebih dahulu.</p>
                  <button onClick={() => setShowNameWarning(false)}>OK</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeQuiz;
