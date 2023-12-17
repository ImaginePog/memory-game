import { useState } from "react";

import "../styles/Settings.css";
import { categories, difficulties } from "../utils/data";

function CategoryCard({
  children,
  value,
  imgSrc,
  description,
  toggleCategory,
  selected,
}) {
  return (
    <div
      className={`category-card ${selected && "category-card-selected"}`}
      data-value={value}
      onClick={(e) => {
        toggleCategory(e.target.dataset.value);
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

export default function Settings({ gameSettings, updateGameSettings }) {
  const selectedCategories = gameSettings.selectedCategories;
  const selectedDifficulty = gameSettings.selectedDifficulty;

  function selectDifficulty(updatedDifficulty) {
    updateGameSettings("selectedDifficulty", updatedDifficulty);
  }

  function toggleCategory(updatedCategory) {
    if (selectedCategories.includes(updatedCategory)) {
      updateGameSettings(
        "selectedCategories",
        selectedCategories.filter((selected) => selected !== updatedCategory)
      );
    } else {
      updateGameSettings("selectedCategories", [
        ...selectedCategories,
        updatedCategory,
      ]);
    }
  }

  function getDifficultyButtons() {
    return Object.entries(difficulties).map(([key, val]) => (
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
          {difficulties[selectedDifficulty].description}
        </p>
      </div>
    </form>
  );
}
