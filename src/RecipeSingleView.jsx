import { useEffect, useState } from "react";
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
  getDocs,
  where,
} from "firebase/firestore";
import { AiOutlineShoppingCart } from "react-icons/ai";
import React from "react";
import { ref, listAll, getDownloadURL, getStorage } from "firebase/storage";
import { storage } from "./firebase";
import ModalAddEditRecipe from "./ModalAddEditRecipe";

const style = {
  recipeAndButtonsContainer: `flex flex-col`,
  buttonsContainer: `flex flex-row basis-full flex-wrap justify-stretch`,
  recipeContainer: `flex flex-col basis-full flex-wrap justify-stretch`,
  recipeTitle: `text-5xl font-bold text-left text-gray-800 p-2`,
  heading: `text-2xl font-bold text-left text-gray-800 p-2 mt-4`,
  text: `text-lg font-bold text-left text-gray-800 p-2`,
  singleRecipe: `bg-[#5D9C59] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  button: `bg-[#5D9C59] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  editButton: `bg-[#DF2E38] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  deleteButton: `bg-[#DF2E38] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  ingredientsContainer: `flex flex-row mb-1`,
  plusButton: `bg-[#5D9C59] text-white mr-2 py-3 px-3 rounded shadow text-sm`,
  imageContainer: `h-64 w-96`,
  image: `h-full w-full object-cover`,
  editContainer: `flex flex-row`,
  editTitleButton: `bg-[#5D9C59] text-white mr-2 py-3 px-3 rounded shadow text-sm`,
};

const RecipeSingleView = ({ selectedRecipe, setViewRecipesModal }) => {
  const [editMode, setEditMode] = useState(false);

  const ingredientsArr = selectedRecipe.recipeIngredients;
  const listIngredients = ingredientsArr.map((item, index) => (
    <div className={style.ingredientsContainer} key={index}>
      <div
        className={style.plusButton}
        onClick={(e) => addSingleToGroceryList(e.target.value, item)}
      >
        {<AiOutlineShoppingCart />}
      </div>
      <div>{item}</div>
    </div>
  ));

  const instructionsArr = selectedRecipe.recipeInstructions;

  const listInstructions = instructionsArr.map((item) => (
    <li key={item}>{item}</li>
  ));

  // add to category (refactor these 3 into 1 later)

  const addToDinners = async (selectedRecipe) => {
    await updateDoc(doc(db, "recipes", selectedRecipe.id), {
      isDinner: true,
    });
  };

  const addToLunches = async (selectedRecipe) => {
    await updateDoc(doc(db, "recipes", selectedRecipe.id), {
      isLunch: true,
    });
  };

  const addToBreakfasts = async (selectedRecipe) => {
    await updateDoc(doc(db, "recipes", selectedRecipe.id), {
      isBreakfast: true,
    });
  };

  const editRecipe = () => {
    setEditMode(true);
  };

  const saveEdits = () => {
    setEditMode(false);
  };

  const deleteRecipe = async (selectedRecipe) => {};

  //add single ingredient to the grocery list
  const addSingleToGroceryList = async (e, item) => {
    // Query the collection to check if the item already exists
    const querySnapshot = await getDocs(
      query(collection(db, "grocery-item"), where("groceryItem", "==", item))
    );

    // If the item already exists, don't add it again
    if (!querySnapshot.empty) {
      console.log("Item already exists in the database.");
      return;
    }

    // Add the item to the database if it doesn't exist
    await addDoc(collection(db, "grocery-item"), {
      groceryItem: item,
    });
  };

  return (
    <div className={style.recipeAndButtonsContainer}>
      <div className={style.buttonsContainer}>
        <button
          className={style.button}
          onClick={() => addToDinners(selectedRecipe)}
        >
          + Dinners
        </button>
        <button
          className={style.button}
          onClick={() => addToLunches(selectedRecipe)}
        >
          + Lunches
        </button>
        <button
          className={style.button}
          onClick={() => addToBreakfasts(selectedRecipe)}
        >
          + Breakfasts
        </button>
        {editMode ? (
          <button
            className={style.editButton}
            onClick={() => saveEdits(selectedRecipe)}
          >
            Save Edits
          </button>
        ) : (
          <button className={style.editButton} onClick={() => editRecipe()}>
            Edit Recipe
          </button>
        )}

        <button
          className={style.deleteButton}
          onClick={() => deleteRecipe(selectedRecipe)}
        >
          Delete Recipe
        </button>
      </div>
      {editMode ? (
        <ModalAddEditRecipe
          selectedRecipe={selectedRecipe}
          editMode={editMode}
          setViewRecipesModal={setViewRecipesModal}
        />
      ) : (
        <div className={style.recipeContainer}>
          <div className={style.editContainer}>
            <div className={style.recipeTitle}>{selectedRecipe.recipeName}</div>
          </div>
          <div className={style.imageContainer}>
            <img className={style.image} src={selectedRecipe.imagePath} />
          </div>

          <div className={style.heading}>Ingredients:</div>
          <div className={style.text}>{listIngredients}</div>
          <div className={style.heading}>Instructions:</div>
          <div className={style.text}>{listInstructions}</div>
          <div className={style.heading}>Notes:</div>
          <div className={style.text}>{selectedRecipe.recipeNotes}</div>
        </div>
      )}
    </div>
  );
};

RecipeSingleView.propTypes = {
  selectedRecipe: PropTypes.object,
};

export default RecipeSingleView;
