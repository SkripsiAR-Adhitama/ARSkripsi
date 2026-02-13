import he from "he";

let materiIpa = [
  {
    category: "Entertainment: Board Games",
    name: "Paru-Paru",
    description: "How many dice are used in the game of Yahtzee?",
    url_ar: "Five",
    image: "yahtzee.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "Alveous",
    description: "How many dots are on a single die?",
    url_ar: "21",
    image: "duck.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "Bronkus",
    description: "What is the world&#039;s oldest board game?",
    url_ar: "Senet",
    image: "aje.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "Trakea",
    description: "In Chess, the Queen has the combined movement of which two pieces?",
    url_ar: "Bishop and Rook",
    image: "heart.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "In Yu-Gi-Oh, how does a player perform an Xyz Summon?",
    url_ar: "Overlay at least 2 Monsters of the Same Level",
    image: "hayu.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description:
      "What is the most challenging monster in the Dungeons &amp; Dragons 5th Edition Monster Manual?",
    url_ar: "Tarrasque",
    image: "stomatch.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description:
      "In Magic: The Gathering, what was a tribute card to Jamie Wakefield&#039;s late wife Marilyn, who loved horses?",
    url_ar: "Timbermare",
    image: "ringke.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description:
      "When Magic: The Gathering was first solicited, which of the following was it originally titled?",
    url_ar: "Mana Clash",
    image: "unik.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "In what year was the card game Magic: the Gathering first introduced?",
    url_ar: "1993",
    image: "yamut.jpg",
  },
  {
    category: "Entertainment: Board Games",
    name: "multiple",
    description: "What is the sum of all the tiles in a standard box of Scrabble?",
    url_ar: "187",
    image: "ara.jpg",
  },
];

// This operation should be done when we retrieve our trivia data from the server.
materiIpa = materiIpa.map((item) => {
  return {
    ...item,
    description: he.decode(item.description),
    url_ar: he.decode(item.url_ar),
  };
});
  
export default materiIpa;