import React from 'react'
import '../quiz/style/stats.css';

/**
 * The Stats untuk mengelola skor dan nomor pertanyaan.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNumber
 * @param {number} props.totalQuestions
 * @param {number} props.remainingLives
 */
function Stats({ score, questionNumber, totalQuestions, remainingLives}) {
  let livesDisplay;
  const remainingQuestions = totalQuestions - questionNumber;
  const progressPercentage = (questionNumber / totalQuestions) * 100;
  if (remainingLives > 0) {
    const hearts = Array.from({ length: remainingLives }, (_, i) => '❤️');
    livesDisplay = hearts.join(" ");
  } else {
    livesDisplay = "0 ❤️";
  }

  return (
    <div className="stats-container">
      <div className="stats__top-row">
        <div className="stats__badge">Skor: {score}</div>
        <div className="stats__lives">
          {Array.from({ length: remainingLives }, (_, i) => (
            <span key={i} className="heart-icon">❤️</span>
          ))}
          {remainingLives === 0 && "0 ❤️"}
        </div>
      </div>
      
      <div className="progress-container">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <span className="progress-text">
          {remainingQuestions > 0 
            ? `Sisa ${remainingQuestions} soal lagi!` 
            : "Soal Terakhir! Ayo fokus!"}</span>
      </div>
    </div>
  );
}

export default Stats