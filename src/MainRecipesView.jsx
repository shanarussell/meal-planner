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
import { FaRegTrashAlt } from "react-icons/fa";
import SingleRecipeView from "./SingleRecipeView";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  recipeGrid: `grid grid-cols-4 gap-1`,
  singleRecipeContainer: `border p-4 w-[15%] text-center`,
};

const MainRecipesView = () => {
  const [recipes, setRecipes] = useState([]);

  // Read Selected Dinners from Firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let recipesArr = [];
      querySnapshot.forEach((item) => {
        recipesArr.push({ ...item.data(), id: item.id });
      });

      setRecipes(recipesArr);
    });
    return () => unsubscribe();
  }, []);

  const viewSingleRecipe = (recipe) => {
    console.log(recipe);
    <SingleRecipeView recipe={recipe} />;
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Recipes</h3>
      <div className={style.recipeGrid}>
        {recipes.map((recipe) => (
          <div
            className={style.singleRecipeContainer}
            key={recipe.id}
            onClick={() => {
              viewSingleRecipe(recipe);
            }}
          >
            {recipe.recipeName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainRecipesView;
