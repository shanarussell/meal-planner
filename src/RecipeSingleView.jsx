import PropTypes from "prop-types";

const style = {
  recipeContainer: `flex flex-col basis-full flex-wrap justify-stretch`,
  recipeTitle: `text-4xl font-bold text-left text-gray-800 p-2`,
  heading: `text-2xl font-bold text-left text-gray-800 p-2`,
  text: `text-lg font-bold text-left text-gray-800 p-2`,
  singleRecipe: `bg-[#2EB62C] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
};

const RecipeSingleView = ({ selectedRecipe }) => {

    const ingredientsArr = selectedRecipe.recipeIngredients;
    const listIngredients = ingredientsArr.map((item) => <li key={item}>{item}</li>)
    
    const instructionsArr = selectedRecipe.recipeInstructions;
    const listInstructions = instructionsArr.map((item) => <li key={item}>{item}</li>)
    
  return (
    <div className={style.recipeContainer}>
      <div className={style.recipeTitle}>{selectedRecipe.recipeName}</div>
      <div className={style.heading}>Ingredients:</div>
      <div className={style.text}>{listIngredients}</div>
      <div className={style.heading}>Instructions:</div>
      <div className={style.text}>{listInstructions}</div>
    </div>
  );
};

RecipeSingleView.propTypes = {
  selectedRecipe: PropTypes.object,
};

export default RecipeSingleView;
