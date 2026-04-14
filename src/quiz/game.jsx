/**
 * Page utama yang menampilkan game atau kuis
 */
import React, { useState, useMemo, useEffect } from "react";
import Stats from "./stats";
import TriviaItem from "./trivia-item";
import EndScreen from "./end-screen";
import triviaData from "./trivia-data";
import shuffle from "./arrays/shuffle";

function Game({
  playerName = "Guest",
  numQuestions = triviaData.length,
  lifePoints = 10,
  onGameFinish,
}) {
  const LIFE_VALUE = 2;

  const selectedQuestions = useMemo(() => {
    const shuffled = shuffle(triviaData);
    return shuffled.slice(0, numQuestions);
  }, [numQuestions]);

  const [gameState, setGameState] = useState({
    score: 0,
    triviaIndex: 0,
    isGameOver: false,
    remainingLives: lifePoints,
  });

  const { score, triviaIndex, isGameOver, remainingLives } = gameState;

  const lifeBonus = remainingLives * LIFE_VALUE;
  const finalScore = score + lifeBonus;

  const savedHighScore = localStorage.getItem("quizHighScore");
  let highScore = savedHighScore ? parseInt(savedHighScore) : 0;

  let isNewHighScore = false;

  if (isGameOver) {
    if (finalScore > highScore) {
      highScore = finalScore;
      localStorage.setItem("quizHighScore", finalScore);
      isNewHighScore = true;
    }
  }

  const questionNumber = triviaIndex + 1;

  const restartGame = () => {
    setGameState({
      score: 0,
      triviaIndex: 0,
      isGameOver: false,
      remainingLives: lifePoints,
    });
  };

  const loadNextQuestion = () => {
    if (triviaIndex >= selectedQuestions.length - 1) {
      setGameState((prev) => ({
        ...prev,
        isGameOver: true,
      }));
    } else {
      setGameState((prev) => ({
        ...prev,
        triviaIndex: prev.triviaIndex + 1,
      }));
    }
  };

  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      setGameState((prev) => ({
        ...prev,
        score: prev.score + 4,
      }));
    } else {
      const newLives = remainingLives - 1;

      if (newLives <= 0) {
        setGameState((prev) => ({
          ...prev,
          remainingLives: 0,
          isGameOver: true,
        }));
      } else {
        setGameState((prev) => ({
          ...prev,
          remainingLives: newLives,
        }));
      }
    }
  };

  let pageContent;

  if (isGameOver) {
    pageContent = (
      <EndScreen
        score={score}
        lifeBonus={lifeBonus}
        finalScore={finalScore}
        totalQuestions={selectedQuestions.length}
        playerName={playerName}
        remainingLives={remainingLives}
        initialLives={lifePoints}
        bestScore={highScore}
        isNewHighScore={isNewHighScore}
        onRetryClick={restartGame}
      />
    );
  } else {
    const triviaQuestion = selectedQuestions[triviaIndex];

    const { correct_answer, incorrect_answers, question } = triviaQuestion;

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

  useEffect(() => {
    if (isGameOver && onGameFinish) {
      onGameFinish();
    }
  }, [isGameOver, onGameFinish]);

  return (
    <>
      {!isGameOver ? (
        <>
          <Stats
            score={score}
            questionNumber={questionNumber}
            totalQuestions={selectedQuestions.length}
            remainingLives={remainingLives}
          />

          <TriviaItem
            key={triviaIndex}
            question={selectedQuestions[triviaIndex].question}
            correctAnswer={selectedQuestions[triviaIndex].correct_answer}
            incorrectAnswers={selectedQuestions[triviaIndex].incorrect_answers}
            onNextClick={loadNextQuestion}
            onAnswerSelected={onAnswerSelected}
          />
        </>
      ) : (
        <EndScreen
          score={score}
          lifeBonus={lifeBonus}
          finalScore={finalScore}
          totalQuestions={selectedQuestions.length}
          playerName={playerName}
          remainingLives={remainingLives}
          initialLives={lifePoints}
          bestScore={highScore}
          isNewHighScore={isNewHighScore}
          onRetryClick={restartGame}
        />
      )}
    </>
  );
}

export default Game;
