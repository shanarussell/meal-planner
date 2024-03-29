import PropTypes from "prop-types";
import RecipeSingleView from "./RecipeSingleView";
import useRecipes from "./hooks/useRecipes";
import { useState } from "react";

const style = {
  modalPosition: `justify-center items-center flex fixed inset-0 z-50 outline-none`,
  modalSize: `relative w-auto mx-5 w-full max-h-full overflow-auto`,
  modalOuterContainer: `rounded-lg shadow-lg flex flex-col w-full bg-white outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-[#DF2E38] float-right text-3xl leading-none font-semibold outline-none`,
  modalTextContainer: `relative p-6 sm:p-1`,
  greyContainer: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4 sm:p-1`,
  recipeContainer: `flex flex-row basis-full flex-wrap justify-center`,
  singleRecipeContainer: `h-56 sm:h-48 w-64 bg-[#116A7B] m-3 py-3 px-6 rounded shadow`,
  singleRecipeImageContainer: `box-border h-36 sm:h-28 mt-2 mb-2`,
  singleRecipeTextContainer: ``,
  thumbnailImage: `h-full w-full object-cover`,
  searchBoxContainer: `w-full max-w-xl flex mx-auto p-20 text-xl`,
  searchBox: `w-full placeholder-gray-400 text-gray-900 p-4`,
  recipeTitle: `text-md sm:text-sm font-bold text-left text-white`,
};

const ModalViewAllRecipes = ({ setViewRecipesModal, user }) => {
  const [listAll, setListAll] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [query, setQuery] = useState(""); //search
  const { allRecipes } = useRecipes({ user });

  // Extracting recipe titles for search and converting them to lowercase for search
  // const titles = allRecipes.map((recipe) => recipe.recipeName.toLowerCase());

  // //search function
  // function search(e){
  //   e.preventDefault();
  //   const queryLower = query.toLowerCase();
  //   console.log(queryLower);

  //   const matchingTitles = titles.filter((title) => title.includes(queryLower));

  //   console.log("Result: " + matchingTitles);
  // }

  //when a recipe is clicked, the list hides and a single recipe is shown
  const handleClick = (recipe) => {
    setListAll(false);

    setSelectedRecipe(recipe);
  };
  console.log(allRecipes);

  //lists all the recipes from the allRecipes state as divs with button styles

  return (
    <>
      {listAll ? (
        <>
          <div className={style.modalPosition}>
            <div className={style.modalSize}>
              {/*content*/}
              <div className={style.modalOuterContainer}>
                {/*header*/}
                <div className={style.modalHeader}>
                  <h3 className={style.modalTitle}>Recipes</h3>
                  <div className={style.searchBoxContainer}>
                    <input
                      type="text"
                      className={style.searchBox}
                      placeholder="Search titles and ingredients"
                      onChange={(e) => setQuery(e.target.value)}
                      value={query}
                    />
                  </div>
                  <button
                    className={style.modalXButton}
                    onClick={() => setViewRecipesModal(false)}
                  >
                    <span className={style.modalCloseButton}>×</span>
                  </button>
                </div>
                {/*body*/}
                <div className={style.modalTextContainer}>
                  <div className={style.greyContainer}>
                    <div className={style.recipeContainer}>
                      {allRecipes
                      //controls the search feature - searches ingredients and titles
                        .filter((item) => {
                          return (
                            query.toLowerCase() === "" ||
                            item.recipeName.toLowerCase().includes(query) ||
                            item.recipeIngredients.some((ingredient) =>
                              ingredient.toLowerCase().includes(query)
                            )
                          );
                        })
                        .map((recipe) => (
                          <div
                            className={style.singleRecipeContainer}
                            key={recipe.id}
                            onClick={() => handleClick(recipe)}
                          >
                            <div className={style.singleRecipeImageContainer}>
                              <img
                                className={style.thumbnailImage}
                                src={recipe.imagePath}
                              />
                            </div>
                            <div className={style.singleRecipeTextContainer}>
                              <h3 className={style.recipeTitle}>
                                {recipe.recipeName}
                              </h3>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : (
        <RecipeSingleView
          user={user}
          selectedRecipe={selectedRecipe}
          setViewRecipesModal={setViewRecipesModal}
        />
      )}
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ModalViewAllRecipes.propTypes = {
  setViewRecipesModal: PropTypes.func,
  user: PropTypes.object,
};

export default ModalViewAllRecipes;
