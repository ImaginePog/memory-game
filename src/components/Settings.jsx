// Utility imports
import { categories, difficulties } from "../utils/data";

// Styles
import "../styles/Settings.css";

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

function DifficultyButton({ children, handleClick, selected, value }) {
  let classes = "difficulty-btn";
  if (selected) {
    classes += " " + "selected-btn";
  }

  return (
    <button
      className={classes}
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
    return Object.entries(difficulties).map(([key, val]) => {
      const selected = key == selectedDifficulty;
      return (
        <DifficultyButton
          value={key}
          key={key}
          selected={selected}
          handleClick={selectDifficulty}
        >
          {key}
        </DifficultyButton>
      );
    });
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
        <p className="category-selection-header">
          Choose categories for cards:
        </p>
        <ul className="category-list">{getCategoryCards()}</ul>
      </div>

      <div className="difficulty-selection">
        <p className="difficulty-selection-header">Choose difficulty:</p>
        <ul className="difficulty-btn-list">{getDifficultyButtons()}</ul>
        <p className="difficulty-description">
          {difficulties[selectedDifficulty].description}
        </p>
      </div>
    </form>
  );
}
