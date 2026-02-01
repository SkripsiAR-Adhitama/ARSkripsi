/**
 * Page utama yang menampilkan game atau kuis
 */
import React, { useState, useMemo } from 'react'
import Stats from './stats'
import TriviaItem from './trivia-item'
import EndScreen from './end-screen'
import triviaData from './trivia-data'

function Game({playerName = 'Guest', numQuestions=triviaData.length, lifePoints= 10}) {
  const selectedQuestions = useMemo(() => {
    return triviaData.slice(0, numQuestions);
  }, [numQuestions]);

  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    isGameOver: false,
    remainingLives: lifePoints,
  });

  const {score, triviaIndex, isGameOver, remainingLives} = gameState;
  const questionNumber = triviaIndex + 1;

  const restartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      isGameOver: false,
      remainingLives: lifePoints,
    })
  }

  const loadNextQuestion = () => {
    if (triviaIndex >= selectedQuestions.length - 1){
      setGameState({...gameState, isGameOver: true});
    } else {
      setGameState({...gameState, triviaIndex: triviaIndex + 1});
    }
  }

  const onAnswerSelected = (wasPlayerCorrect) => {
    console.log('Jawabanmu', wasPlayerCorrect);
    
    if (wasPlayerCorrect) {
      // Jawaban benar
      setGameState({
        ...gameState,
        score: score + 1,
      });
    } else {
      // Jawaban salah - kurangi nyawa
      const newLives = remainingLives - 1;
      console.log('Nyawa berkurang dari', remainingLives, 'menjadi', newLives);
      
      if (newLives <= 0) {
        // Nyawa habis - game over
        setGameState({
          ...gameState,
          remainingLives: 0,
          isGameOver: true,
        });
      } else {
        // Nyawa masih ada
        setGameState({
          ...gameState,
          remainingLives: newLives,
        });
      }
    }
  }

  let pageContent;
  if (isGameOver) {
    pageContent = (
      <EndScreen 
        score={score} 
        totalQuestions={selectedQuestions.length}
        playerName={playerName}
        remainingLives={remainingLives}
        initialLives={lifePoints}
        bestScore={0} 
        onRetryClick={restartGame}
      />
    );
  } else {
    const triviaQuestion = selectedQuestions[triviaIndex];
    const {correct_answer, incorrect_answers, question} = triviaQuestion;
    pageContent = (
      <TriviaItem 
        key={triviaIndex}
        question={question} 
        correctAnswer={correct_answer} 
        incorrectAnswers={incorrect_answers}
        onNextClick={loadNextQuestion}
        onAnswerSelected={onAnswerSelected}
      /> 
    );
  }

  return (
    <>
      <Stats 
        score={score} 
        questionNumber={questionNumber} 
        totalQuestions={selectedQuestions.length}
        remainingLives={remainingLives}
      />   
      {pageContent}
    </>
  )
}

export default Game