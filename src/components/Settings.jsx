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
      <img src={imgSrc} alt={children} />
      <p>{children}</p>
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
        handleClick(Number(e.target.value));
      }}
    >
      {children}
    </button>
  );
}

export default function Settings() {
  const [selectedCategories, setSelectedCategories] = useState([0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(0);

  function selectDifficulty(updatedDifficulty) {
    setSelectedDifficulty(updatedDifficulty);
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
    return difficultySettings.map((setting, index) => (
      <DifficultyButton
        value={index}
        key={index}
        handleClick={selectDifficulty}
      >
        {setting.difficulty}
      </DifficultyButton>
    ));
  }

  function getCategoryCards() {
    return categories.map((category, index) => (
      <CategoryCard
        imgSrc={category.imgSrc}
        key={index}
        description={category.description}
        value={index}
        toggleCategory={toggleCategory}
      >
        {category.name}
      </CategoryCard>
    ));
  }

  return (
    <form className="settings">
      <label>
        Name:
        <input type="text" />
      </label>

      <div className="category-selection">
        Choose categories for cards:
        {getCategoryCards()}
        <p>
          Current selections:
          {selectedCategories.map((category) => categories[category].name)}
        </p>
      </div>

      <div className="difficulty-selection">
        Choose difficulty:
        {getDifficultyButtons()}
        <p className="difficulty-description">
          {difficultySettings[selectedDifficulty].description}
        </p>
      </div>

      <button>Start</button>
    </form>
  );
}
