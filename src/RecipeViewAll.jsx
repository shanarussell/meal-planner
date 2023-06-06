import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import RecipeSingleView from "./RecipeSingleView";

const style = {
  greyContainer: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4`,
  heading: `text-xl font-bold text-left text-gray-800 p-2`,
  recipeContainer: `flex flex-row basis-full flex-wrap justify-stretch`,
  singleRecipe: `bg-[#2EB62C] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
};

const RecipeViewAll = () => {
  //this is the All Recipes view that is launched from ModalViewAllRecipes
  //It can also launch the single recipe is generated from the RecipeSingleView component
  //It reads the recipes from the database and adds them to the allRecipes state
  //listAll state starts with true, so the list of recipes is shown
  //this listAll does not require another component, it's done in the listAllRecipes function
  //when user clicks a recipe, listAll is set to false and it shows the single recipe instead

  const [allRecipes, setAllRecipes] = useState([]);
  const [listAll, setListAll] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState();

  // Read Recipes from Firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allRecipesArray = [];
      querySnapshot.forEach((item) => {
        allRecipesArray.push({ ...item.data(), id: item.id });
      });

      setAllRecipes(allRecipesArray);
    });
    return () => unsubscribe();
  }, []);

  //when a recipe is clicked, the list hides and a single recipe is shown
  const handleClick = (recipe) => {
    setListAll(false);
    setSelectedRecipe(recipe);
  };

  //lists all the recipes from the allRecipes state as divs with button styles
  const listAllRecipes = allRecipes.map((recipe) => (
    <div
      className={style.singleRecipe}
      key={recipe.id}
      onClick={() => handleClick(recipe)}
    >
      {recipe.recipeName}
    </div>
  ));

  return (
    <div className={style.greyContainer}>
      <div className={style.recipeContainer}>
        {listAll ? (
          listAllRecipes
        ) : (
          <RecipeSingleView selectedRecipe={selectedRecipe} />
        )}
      </div>
    </div>
  );
};

export default RecipeViewAll;
