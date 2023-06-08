import { useState } from "react";
import ModalViewAllRecipes from "./ModalViewAllRecipes";
import ModalAddEditRecipe from "./ModalAddEditRecipe";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  recipeGrid: `grid grid-cols-4 gap-1`,
  singleRecipeContainer: `border p-4 w-[15%] text-center`,
  buttonContainer: `flex flex-auto items-center justify-around`,
  mainButtons: `bg-[#5D9C59] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
};

const MainRecipesView = () => {
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
        <ModalViewAllRecipes setViewRecipesModal={setViewRecipesModal} />
      ) : null}

      {newRecipeModal ? (
        <ModalAddEditRecipe
          setNewRecipeModal={setNewRecipeModal}
          setViewRecipesModal={setViewRecipesModal}
        />
      ) : null}
    </div>
  );
};

export default MainRecipesView;
