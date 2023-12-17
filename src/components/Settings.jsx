import { useState } from "react";

import "../styles/Settings.css";
import { categories, difficultySettings } from "../utils/data";

function CategoryCard({
  children,
  value,
  imgSrc,
  description,
  toggleCategory,
}) {
  return (
    <div
      className="category-card"
      data-value={value}
      onClick={(e) => {
        toggleCategory(Number(e.target.dataset.value));
      }}
    >
      <p className="category-card-title">{children}</p>
      <img src={imgSrc} alt={children} className="category-img" />
      <p>{description}</p>
    </div>
  );
}

function DifficultyButton({ children, handleClick, value }) {
  return (
    <button
      type="button"
      value={value}
      onClick={(e) => {
        handleClick(e.target.value);
      }}
    >
      {children}
    </button>
  );
}

export default function Settings() {
  const [selectedCategories, setSelectedCategories] = useState(["Pokemon"]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("Goldfish");

  function selectDifficulty(updatedDifficulty) {
    setSelectedDifficulty(updatedDifficulty);
    if (updatedDifficulty === "Savant") {
      setSelectedCategories([]);
    }
  }

  function toggleCategory(updatedCategory) {
    if (selectedCategories.includes(updatedCategory)) {
      setSelectedCategories(
        selectedCategories.filter((selected) => selected !== updatedCategory)
      );
    } else {
      setSelectedCategories([...selectedCategories, updatedCategory]);
    }
  }

  function getDifficultyButtons() {
    return Object.entries(difficultySettings).map(([key, val]) => (
      <DifficultyButton value={key} key={key} handleClick={selectDifficulty}>
        {key}
      </DifficultyButton>
    ));
  }

  function getCategoryCards() {
    return Object.entries(categories).map(([key, val]) => {
      let selected = false;
      if (selectedCategories.includes(key)) {
        selected = true;
      }

      return (
        <CategoryCard
          imgSrc={val.imgSrc}
          key={key}
          description={val.description}
          value={key}
          selected={selected}
          toggleCategory={toggleCategory}
        >
          {key}
        </CategoryCard>
      );
    });
  }

  return (
    <form className="settings">
      <div className="category-selection">
        Choose categories for cards:
        <ul className="category-list">{getCategoryCards()}</ul>
        <p>
          Current selections:
          {selectedCategories.map((category) => category)}
        </p>
      </div>

      <div className="difficulty-selection">
        Choose difficulty:
        {getDifficultyButtons()}
        <p className="difficulty-description">
          {difficultySettings[selectedDifficulty].description}
        </p>
      </div>
    </form>
  );
}
