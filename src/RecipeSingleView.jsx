import PropTypes from "prop-types";
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

const style = {
  recipeAndButtonsContainer: `flex flex-col`,
  buttonsContainer: `flex flex-row basis-full flex-wrap justify-stretch`,
  recipeContainer: `flex flex-col basis-full flex-wrap justify-stretch`,
  recipeTitle: `text-4xl font-bold text-left text-gray-800 p-2`,
  heading: `text-2xl font-bold text-left text-gray-800 p-2 mt-4`,
  text: `text-lg font-bold text-left text-gray-800 p-2`,
  singleRecipe: `bg-[#2EB62C] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  button: `bg-[#2EB62C] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
};

const RecipeSingleView = ({ selectedRecipe }) => {
  const ingredientsArr = selectedRecipe.recipeIngredients;
  const listIngredients = ingredientsArr.map((item) => (
    <li key={item}>{item}</li>
  ));

  const instructionsArr = selectedRecipe.recipeInstructions;
  const listInstructions = instructionsArr.map((item) => (
    <li key={item}>{item}</li>
  ));

 
  // add to category (refactor these 3 into 1 later)
  const addToDinners = async (e) => {
    e.preventDefault(e);
    await addDoc(collection(db, "recipes"), {
      isDinner: true,
    });
  };

  const addToLunches = async (e) => {
    e.preventDefault(e);
    await addDoc(collection(db, "recipes"), {
      isLunch: true,
    });
  };

  const addToBreakfasts = async (e) => {
    e.preventDefault(e);
    await addDoc(collection(db, "recipes"), {
      isBreakfast: true,
    });
  };

  return (
    <div className={style.recipeAndButtonsContainer}>
      <div className={style.buttonsContainer}>
        <button className={style.button} onClick={addToDinners}>
          + Dinners
        </button>
        <button className={style.button} onClick={addToLunches}>
          + Lunches
        </button>
        <button className={style.button} onClick={addToBreakfasts}>
          + Breakfasts
        </button>
      </div>
      <div className={style.recipeContainer}>
        <div className={style.recipeTitle}>{selectedRecipe.recipeName}</div>
        <div className={style.heading}>Ingredients:</div>
        <div className={style.text}>{listIngredients}</div>
        <div className={style.heading}>Instructions:</div>
        <div className={style.text}>{listInstructions}</div>
        <div className={style.heading}>Notes:</div>
        <div className={style.text}>{selectedRecipe.recipeNotes}</div>
      </div>
    </div>
  );
};

RecipeSingleView.propTypes = {
  selectedRecipe: PropTypes.object,
};

export default RecipeSingleView;
