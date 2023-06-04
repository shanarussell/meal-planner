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
import { AiOutlinePlus } from "react-icons/ai";

const style = {
  container: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4`,
  heading: `text-xl font-bold text-left text-gray-800 p-2`,
  inputRecipeName: `border p-2 w-1/2 text-xl mb-4`,
  inputIngredient: `border p-2 w-full text-xl mb-4`,
  inputInstructions: `border p-2 w-full text-xl mb-4`,
  submitButton: `bg-[#2EB62C] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
};

const RecipeAddNew = () => {
    const [inputRecipeName, setRecipeNameInput] = useState("");
    const [inputIngredient, setIngredientInput] = useState("");
    const [inputInstructions, setInstructionsInput] = useState("");


  // Create Recipe (add)
  const createRecipe = async (e) => {
    e.preventDefault(e);

    const ingredientArray = inputIngredient.split(", ")
    const instructionsArray = inputInstructions.split(", ");
    
    await addDoc(collection(db, "recipes"), {
      recipeName: inputRecipeName,
      recipeIngredients: ingredientArray,
      recipeInstructions: instructionsArray,
    });
    setRecipeNameInput("");
    setIngredientInput("");
    setInstructionsInput("");
  };

  


  return (
    <div className={style.container}>
      <form>
        <h3 className={style.heading}>Recipe Name:</h3>
        <input
          value={inputRecipeName}
          onChange={(e) => setRecipeNameInput(e.target.value)}
          className={style.inputRecipeName}
          type="text"
          placeholder="Add Recipe Title"
        />
        <h3 className={style.heading}>Ingredients:</h3>
        <textarea
          value={inputIngredient}
          onChange={(e) => setIngredientInput(e.target.value)}
          className={style.inputIngredient}
          rows={"5"}
          placeholder="Add ingredients separated by commas"
        />
        <h3 className={style.heading}>Cooking Instructions:</h3>
        <textarea
          value={inputInstructions}
          onChange={(e) => setInstructionsInput(e.target.value)}
          className={style.inputInstructions}
          rows={"7"}
          placeholder="Add instructions with each step separated by a comma"
        />

        <br />
        <button className={style.submitButton} onClick={createRecipe}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default RecipeAddNew;
