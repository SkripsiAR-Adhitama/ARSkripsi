import he from "he";

let makroIpa = [
    {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "How many dice are used in the game of Yahtzee?",
    url_ar: "Five",
  },
    {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "How many dice are used in the game of Yahtzee?",
    url_ar: "Five",
  },
    {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "How many dice are used in the game of Yahtzee?",
    url_ar: "Five",
  },
];

// This operation should be done when we retrieve our trivia data from the server.
makroIpa = makroIpa.map((item) => {
  return {
    ...item,
    question: he.decode(item.question),
    correct_answer: he.decode(item.correct_answer),
  };
});
  
export default makroIpa;