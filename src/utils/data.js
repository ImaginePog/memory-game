export const categories = {
  Pokemon: {
    imgSrc: "/public/images/pokemon-card.png",
    description: "Random pokemons from all generations",
  },
  "Rick and Morty": {
    imgSrc: "/public/images/rickmort-card.png",
    description: "Random rick and morty characters",
  },
  Dogs: {
    imgSrc: "/public/images/dogs-card.jpg",
    description: "Random dog images of different breeds",
  },
};

export const difficulties = {
  Goldfish: {
    cards: 5,
    description: "Haha goldfish memory only 5 pairs of cards in 30 seconds",
    time: 30, //In seconds
    rows: 2,
    cols: 5,
  },
  Elephant: {
    cards: 10,
    description: "Commendable memory, 10 pairs of cards in 1 minute",
    time: 60, //In seconds
    rows: 4,
    cols: 5,
  },
  Dolphin: {
    cards: 20,
    description: "Awesome memory, 20 pairs of cards in 1 minute",
    time: 60, //In seconds
    rows: 8,
    cols: 5,
  },
  Savant: {
    cards: 50,
    description:
      "A Savant :o, 50 pairs of cards from all different contents in 1 minute",
    time: 60,
    rows: 10,
    cols: 10,
  },
};

export const defaultSettings = {
  selectedDifficulty: "Goldfish",
  selectedCategories: ["Rick and Morty"],
};
