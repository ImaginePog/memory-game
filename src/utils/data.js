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
    imgSrc: "/public/images/pokemon-card.png",
    description: "Random dog images of different breeds",
  },
};

export const difficulties = {
  Goldfish: {
    cards: 5,
    description: "Haha goldfish memory only 5 pairs of cards",
  },
  Elephant: {
    cards: 10,
    description: "Commendable memory, 10 pairs of cards",
  },
  Dolphin: {
    cards: 20,
    description: "Awesome memory, 20 pairs of cards",
  },
  Savant: {
    cards: 50,
    description: "A Savant :o, 50 pairs of cards from all different contents.",
  },
};

export const defaultSettings = {
  selectedDifficulty: "Goldfish",
  selectedCategories: ["Pokemon"],
};
