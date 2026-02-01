import React, { useState } from 'react'
import './home-quiz.css';
import { useNavigate } from 'react-router-dom'
import triviaData from './trivia-data';
function HomeQuiz() {
const navigate=useNavigate();
const [playerName, setPlayerName] = useState('');
const numQuestions = triviaData.length; 

const handleStartQuiz = () => {
    if (playerName.trim() === '') {
      alert('Silakan masukkan nama Anda!');
      return;
    }
  navigate('halaman-kuis', { 
      state: { 
        playerName: playerName.trim(),
        numQuestions: parseInt(numQuestions)
      } 
    });
  };

  return (
  <div>
   <div className="home-quiz__form">
        <div className="home-quiz__input-group">
          <label htmlFor="playerName">Nama:</label>
          <input
            type="text"
            id="playerName"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Masukkan nama Anda"
            maxLength={30}
          />
        </div>
         <div>Jumlah Soal : {numQuestions}</div>
        <div className="home-quiz__info">
          <p> Jumlah Nyawa ❤️ : 10</p>
        </div>
      </div>
     
  <button className="home-quiz__button" onClick={handleStartQuiz}> Mulai Kuis </button>
  </div>
  )
}

export default HomeQuiz