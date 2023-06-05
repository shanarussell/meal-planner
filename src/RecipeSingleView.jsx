import PropTypes from "prop-types";

const RecipeSingleView = ({ selectedRecipe }) => {
  return (
    <div>
      <div>{selectedRecipe.recipeName}</div>
      <div>{selectedRecipe.recipeIngredients}</div>
      <div>{selectedRecipe.recipeInstructions}</div>
    </div>
  );
};

RecipeSingleView.propTypes = {
  selectedRecipe: PropTypes.object,
};

export default RecipeSingleView;
