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
import ModalViewAllRecipes from "./ModalViewAllRecipes";
import ModalAddNewRecipe from "./ModalAddNewRecipe";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  recipeGrid: `grid grid-cols-4 gap-1`,
  singleRecipeContainer: `border p-4 w-[15%] text-center`,
  buttonContainer: `flex flex-auto items-center justify-around`,
  mainButtons: `bg-[#2EB62C] text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
  modalContainer: `justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none`,
  modalSize: `relative w-auto mx-20 max-w-full`,
  modalCharacteristics: `border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none`,
  modalCloseButton: `bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none`,
  modalTextContainer: `relative p-6 flex-auto`,
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
        <ModalViewAllRecipes
          viewRecipesModal={viewRecipesModal}
          setViewRecipesModal={setViewRecipesModal}
        />
      ) : null}

      {newRecipeModal ? (
        <ModalAddNewRecipe
          newRecipeModal={newRecipeModal}
          setNewRecipeModal={setNewRecipeModal}
        />
      ) : null}
    </div>
  );
};

export default MainRecipesView;
