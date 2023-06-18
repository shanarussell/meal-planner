import { useState } from "react";
import ModalViewAllRecipes from "./ModalViewAllRecipes";
import ModalAddEditRecipe from "./ModalAddEditRecipe";
import PropTypes from "prop-types";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8 w-full`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  recipeGrid: `flex flex-wrap sm:flex-col lg:flex-row`,
  buttonContainer: `flex flex-auto items-center justify-around sm:flex-col`,
  mainButtons: `w-full bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-lg px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none m-2 ease-linear transition-all duration-150`,
};

const MainRecipesView = ({ user }) => {
  const [viewRecipesModal, setViewRecipesModal] = useState(false);
  const [newRecipeModal, setNewRecipeModal] = useState(false);

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Recipes</h3>
      <div className={style.buttonContainer}>
        <button
          className={style.mainButtons}
          type="button"
          onClick={() => setViewRecipesModal(true)}
        >
          View all recipes
        </button>

        <button
          className={style.mainButtons}
          type="button"
          onClick={() => setNewRecipeModal(true)}
        >
          Add New Recipe
        </button>
      </div>

      {viewRecipesModal ? (
        <ModalViewAllRecipes
          user={user}
          setViewRecipesModal={setViewRecipesModal}
        />
      ) : null}

      {newRecipeModal ? (
        <ModalAddEditRecipe
          user={user}
          setNewRecipeModal={setNewRecipeModal}
          setViewRecipesModal={setViewRecipesModal}
        />
      ) : null}
    </div>
  );
};

MainRecipesView.propTypes = {
  user: PropTypes.object,
};

export default MainRecipesView;
