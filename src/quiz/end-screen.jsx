/**
 * Page untuk menampilkan game telah selesai
 */
import React from "react";
import "../quiz/style/end-screen.css";
import { useNavigate } from "react-router-dom";
function EndStat({ label, value }) {
  return (
    <div className="end-screen__stat">
      <div className="end-screen__stat-label">{label}</div>
      <div className="end-screen__stat-value">{value}</div>
    </div>
  );
}

/**
 * EndScreen menunjukkan hasil dari kuis
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {() => void} props.onRetryClick
 */

const getBadge = (score) => {
  if (score >= 90) {
    return {
      title: "Quiz Master",
      icon: "🏆",
      desc: "Sangat Baik",
    };
  } else if (score >= 80) {
    return {
      title: "Expert",
      icon: "🥇",
      desc: "Baik",
    };
  } else if (score >= 70) {
    return {
      title: "Learner",
      icon: "🥈",
      desc: "Cukup",
    };
  } else {
    return {
      title: "Beginner",
      icon: "🥉",
      desc: "Perlu Bimbingan",
    };
  }
};

function EndScreen({
  playerName,
  score,
  lifeBonus,
  finalScore,
  bestScore,
  onRetryClick,
  remainingLives,
  initialLives,
  isNewHighScore,
}) {
  const isGameOverByLives = remainingLives <= 0;
  const badge = getBadge(finalScore || 0);
  const navigate = useNavigate();

  return (
    <div className="end-screen-wrapper">
      {" "}
      <div className="end-result-card">
        <h1 className="end-title">KUIS SELESAI!</h1>

        <div className="end-main-visual">
          {isGameOverByLives ? (
            <div className="end-screen__game-over">
              <div className="end-screen__skull">💀</div>
              <p className="end-screen__message">
                Ups, nyawamu habis! <br /> Ayo coba lagi, kamu pasti bisa!
              </p>
            </div>
          ) : (
            <div className="end-screen__trophy">🏆</div>
          )}
        </div>

        <div className="end-screen__player-info">
          <p>
            Kamu hebat, <strong>{playerName}!</strong>
          </p>
        </div>

        <div className="end-screen__stats-container">
          <EndStat label="Skor Kuis" value={score} />
          <EndStat label="Bonus Nyawa" value={`+${lifeBonus}`} />
          <div className="final-score-highlight">
            <EndStat label="SKOR AKHIR" value={finalScore} />
          </div>
        </div>

        <div className="end-screen__badge-section">
          <div className="badge-card">
            <div className="badge-icon">{badge.icon}</div>
            <div className="badge-info">
              <span className="badge-title">{badge.title}</span>
              <span className="badge-desc">{badge.desc}</span>
            </div>
          </div>
        </div>

        {isNewHighScore && (
          <div className="new-record-tag">🎉 REKOR BARU! 🎉</div>
        )}

        <div className="end-actions">
          <button className="btn-retry" onClick={onRetryClick}>
            Main Lagi 🔄
          </button>
          <button className="btn-home" onClick={() => navigate("/")}>
            Beranda 🏠
          </button>
        </div>
      </div>
    </div>
  );
}

export default EndScreen;
