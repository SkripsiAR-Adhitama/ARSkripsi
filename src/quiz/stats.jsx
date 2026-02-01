import React from 'react'
import "./stats.css";

function Stat({label, value}) {
    return(
    <li className="stats__stat-container">
    <div className="stats__stat-label">{label}</div>
    <div className="stats__stat-value">{value}</div>
    </li>
    );
}

/**
 * The Stats component renders the score and current question number.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.questionNumber
 * @param {number} props.totalQuestions
 * @param {number} props.remainingLives
 */
function Stats({ score, questionNumber, totalQuestions, remainingLives}) {
  // Jika nyawa masih ada, tampilkan hati
  // Jika nyawa habis (0), tampilkan "Habis" atau emoji tengkorak
  let livesDisplay;
  
  if (remainingLives > 0) {
    const hearts = Array.from({ length: remainingLives }, (_, i) => '❤️');
    livesDisplay = hearts.join(" ");
  } else {
    livesDisplay = "0 ❤️";
  }

  return (
    <ul className="stats">
      <Stat label="Score" value={score} />
      <Stat label="Question" value={`${questionNumber} / ${totalQuestions}`} />
      <Stat label="Nyawa" value={livesDisplay} />
    </ul>
  )
}

export default Stats