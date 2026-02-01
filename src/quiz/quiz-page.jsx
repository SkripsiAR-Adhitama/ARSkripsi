import React from 'react'
import { useLocation } from 'react-router-dom'
import Game from './game';

function QuizPage() {
  const location = useLocation();
  const { playerName = 'Guest', numQuestions = 10 } = location.state || {};

  return (
    <main>
      <Game playerName={playerName} numQuestions={numQuestions} />
    </main>
  );
}

export default QuizPage;