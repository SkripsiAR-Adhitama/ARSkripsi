/**
 * Page untuk menampilkan game telah selesai
 */
import React from 'react'
import './end-screen.css';
function EndStat({label, value}){
    return(
        <div className='end-screen__stat'>
            <div className='end-screen__stat-label'>{label}</div>
            <div className='end-screen__stat-value'>{value}</div>
        </div>
    );
}

/**
 * EndScreen renders the final game stats.
 * @param {object} props
 * @param {number} props.score
 * @param {number} props.bestScore
 * @param {() => void} props.onRetryClick A function to run when the retry button is clicked.
 */

function EndScreen({playerName, score, bestScore, onRetryClick, remainingLives, initialLives}) {
 const isGameOverByLives = remainingLives <= 0;

  return<div className='end-screen'>
    <h1>KUIS TELAH SELESAI!</h1>
    {isGameOverByLives ? (
        <div className='end-screen__game-over'>
          <div className='end-screen__skull'>💀</div>
          <p className='end-screen__message'>Nyawa Habis!</p>
        </div>
      ) : (
        <div className='end-screen__trophy'>🏆</div>
      )}
      
      <div className='end-screen__player-name'>
        <h2>Nama Pemain:</h2>
        <strong>{playerName}</strong>
      </div>
    <EndStat label="Score" value={score} />
    {/* <EndStat label="Best Score" value={bestScore} /> */}
    <EndStat label="Sisa Nyawa" value={`${remainingLives} / ${initialLives} ❤️`}/>
    <button className='end-screen__button' onClick={onRetryClick}>Retry?</button>
  </div>
}

export default EndScreen