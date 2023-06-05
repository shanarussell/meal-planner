
import PropTypes from "prop-types";
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

const style = {
  modalPosition: `justify-center items-center flex fixed inset-0 z-50 outline-none`,
  modalSize: `relative w-auto mx-20 w-full`,
  modalOuterContainer: `rounded-lg shadow-lg flex flex-col w-full bg-white outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none`,
  modalTextContainer: `relative p-6`,
  container: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4`,
  heading: `text-xl font-bold text-left text-gray-800 p-2`,
  inputRecipeName: `border p-2 w-1/2 text-xl mb-4`,
  inputIngredient: `border p-2 w-full text-xl mb-4`,
  inputInstructions: `border p-2 w-full text-xl mb-4`,
  inputNotes: `border p-2 w-full text-xl mb-4`,
  submitButton: `bg-[#2EB62C] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
  checkboxesContainer: `flex flex-col`,
  checkboxes: `text-lg font-bold text-left text-gray-800`,
};

const ModalAddNewRecipe = ({ setNewRecipeModal }) => {
  //launches from MainRecipesView
  //setNewRecipe prop is a boolean that sets whether the modal is open or not

  const [inputRecipeName, setRecipeNameInput] = useState("");
  const [inputIngredient, setIngredientInput] = useState("");
  const [inputInstructions, setInstructionsInput] = useState("");
  const [inputNotes, setNotesInput] = useState("");
  let isDinner = false;
  let isBreakfast = false;
  let isLunch = false;

  // Create Recipe (add)
  const createRecipe = async (e) => {
    e.preventDefault(e);

    const ingredientArray = inputIngredient.split(", ");
    const instructionsArray = inputInstructions.split(", ");

    await addDoc(collection(db, "recipes"), {
      recipeName: inputRecipeName,
      recipeIngredients: ingredientArray,
      recipeInstructions: instructionsArray,
      recipeNotes: inputNotes,
      isDinner: isDinner,
      isBreakfast: isBreakfast,
      isLunch: isLunch,
    });
    setNewRecipeModal(false);
  };

  return (
    <>
      <div className={style.modalPosition}>
        <div className={style.modalSize}>
          {/*content*/}
          <div className={style.modalOuterContainer}>
            {/*header*/}
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>Add new recipe</h3>
              <button
                className={style.modalXButton}
                onClick={() => setNewRecipeModal(false)}
              >
                <span className={style.modalCloseButton}>×</span>
              </button>
            </div>
            {/*body*/}
            <div className={style.modalTextContainer}>
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
                  <h3 className={style.heading}>Notes, links, etc:</h3>
                  <textarea
                    value={inputNotes}
                    onChange={(e) => setNotesInput(e.target.value)}
                    className={style.inputNotes}
                    rows={"7"}
                    placeholder="Add Notes with each step separated by a comma"
                  />
                  <div className={style.checkboxesContainer}>
                    <label className={style.checkboxes}>
                      <input
                        type="checkbox"
                        value={isDinner}
                        onChange={() => isDinner = true}
                        className={style.checkboxes}
                      />{" "}
                      Add to this weeks dinners?
                    </label>
                    <label className={style.checkboxes}>
                      <input
                        type="checkbox"
                        value={isBreakfast}
                        onChange={() => isBreakfast = true}
                        className={style.checkboxes}
                      />{" "}
                      Add to this weeks breakfasts?
                    </label>
                    <label className={style.checkboxes}>
                      <input
                        type="checkbox"
                        value={isLunch}
                        onChange={() => isLunch = true}
                        className={style.checkboxes}
                      />{" "}
                      Add to this weeks lunches?
                    </label>
                  </div>
                  <br />
                  <button className={style.submitButton} onClick={createRecipe}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ModalAddNewRecipe.propTypes = {
  setNewRecipeModal: PropTypes.func,
};

export default ModalAddNewRecipe;
