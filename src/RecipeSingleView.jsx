import { useState } from "react";
import PropTypes from "prop-types";
import { db } from "./firebase";
import {
  query,
  collection,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
  where,
} from "firebase/firestore";
import {
  AiOutlineShoppingCart,
  AiOutlineCheck,
  AiOutlineBorder,
  AiOutlineCheckSquare,
} from "react-icons/ai";
import ModalAddEditRecipe from "./ModalAddEditRecipe";

const style = {
  modalPosition: `justify-center items-center flex fixed inset-0 z-50 outline-none`,
  modalSize: `relative w-auto mx-20 mt-10 w-full max-h-full overflow-auto`,
  modalOuterContainer: `rounded-lg shadow-lg flex flex-col w-full bg-white outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-[#DF2E38] float-right text-3xl leading-none font-semibold outline-none`,
  modalTextContainer: `relative p-6`,
  greyContainer: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4`,
  recipeAndButtonsContainer: `flex flex-col`,
  buttonsContainer: `flex flex-row basis-full flex-wrap justify-stretch`,
  recipeContainer: `flex flex-col basis-full flex-wrap justify-stretch`,
  recipeTitle: `text-5xl font-bold text-left text-[#116A7B] p-2 mb-3`,
  heading: `text-3xl font-bold text-left text-[#116A7B] p-2 mt-4`,
  text: `text-lg font-bold text-left text-gray-800 p-2`,
  singleRecipe: `bg-[#116A7B] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  button: `bg-[#116A7B] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  editButton: `bg-[#DF2E38] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  deleteButton: `bg-[#DF2E38] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
  ingredientsContainer: `flex flex-row mb-1 `,
  instructionsList: `list-outside, list-decimal`,
  addToCartButton: `bg-[#116A7B] text-white mr-2 py-3 px-3 rounded shadow text-sm`,
  addedToCartButton: `bg-[#CDC2AE] text-white mr-2 py-3 px-3 rounded shadow text-sm`,
  stepUnfinished: `bg-[#116A7B] text-white mr-2 py-3 px-3 rounded shadow text-lg align-middle`,
  stepFinished: `bg-[#CDC2AE] text-white mr-2 py-3 px-3 rounded shadow text-lg align-middle`,
  imageContainer: `h-64 w-96`,
  image: `h-full w-full object-cover`,
  editContainer: `flex flex-row`,
  editTitleButton: `bg-[#116A7B] text-white mr-2 py-3 px-3 rounded shadow text-sm`,
};

const RecipeSingleView = ({ selectedRecipe, setViewRecipesModal }) => {
  const [editMode, setEditMode] = useState(false);
  const [addedToCart, setAddedToCart] = useState([]);
  const [stepFinished, setStepFinished] = useState([]);

  const ingredientsArr = selectedRecipe.recipeIngredients;

  const formatRecipeNotes = (recipeNotes) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return recipeNotes.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  };

  const formattedRecipeNotes = formatRecipeNotes(selectedRecipe.recipeNotes);

  const listIngredients = ingredientsArr.map((item, i) => (
    <div className={style.ingredientsContainer} key={i}>
      <div
        className={
          addedToCart.includes(i)
            ? style.addedToCartButton
            : style.addToCartButton
        }
        onClick={() => addSingleToGroceryList(i, item)}
      >
        {addedToCart.includes(i) ? (
          <AiOutlineCheck />
        ) : (
          <AiOutlineShoppingCart />
        )}
      </div>
      <div>{item}</div>
    </div>
  ));

  const instructionsArr = selectedRecipe.recipeInstructions;

  const listInstructions = instructionsArr.map((item, i) => (
    <div className={style.ingredientsContainer} key={i}>
      <div
        className={
          stepFinished.includes(i) ? style.stepFinished : style.stepUnfinished
        }
        onClick={() => {
          setStepFinished((prevAdded) => [...prevAdded, i]);
        }}
      >
        {stepFinished.includes(i) ? (
          <AiOutlineCheckSquare />
        ) : (
          <AiOutlineBorder />
        )}
      </div>
      <div>{item}</div>
    </div>
  ));

  // add to category (refactor these 3 into 1 later)

  const addToDinners = async (selectedRecipe) => {
    await updateDoc(doc(db, "recipes", selectedRecipe.id), {
      isDinner: true,
    });
  };

  const editRecipe = () => {
    setEditMode(true);
  };

  const saveEdits = () => {
    setEditMode(false);
  };

  const deleteRecipe = async (selectedRecipe) => {
    await deleteDoc(doc(db, "recipes", selectedRecipe.id));
    setViewRecipesModal(false);
  };

  //add single ingredient to the grocery list
  const addSingleToGroceryList = async (index, item) => {
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
    setAddedToCart((prevAdded) => [...prevAdded, index]);
  };

  return (
    <>
      <div className={style.modalPosition}>
        <div className={style.modalSize}>
          {/*content*/}
          <div className={style.modalOuterContainer}>
            {/*header*/}
            <div className={style.modalHeader}>
              <div className={style.buttonsContainer}>
                <button
                  className={style.button}
                  onClick={() => addToDinners(selectedRecipe)}
                >
                  + Dinners
                </button>

                {editMode ? (
                  <button
                    className={style.editButton}
                    onClick={() => saveEdits(selectedRecipe)}
                  >
                    Save Edits
                  </button>
                ) : (
                  <button
                    className={style.editButton}
                    onClick={() => editRecipe()}
                  >
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
              <button
                className={style.modalXButton}
                onClick={() => setViewRecipesModal(false)}
              >
                <span className={style.modalCloseButton}>×</span>
              </button>
            </div>
            <>
              <div className={style.modalTextContainer}>
                <div className={style.greyContainer}>
                  <div className={style.recipeAndButtonsContainer}>
                    {editMode ? (
                      <ModalAddEditRecipe
                        selectedRecipe={selectedRecipe}
                        editMode={editMode}
                        setViewRecipesModal={setViewRecipesModal}
                      />
                    ) : (
                      <div className={style.recipeContainer}>
                        <div className={style.editContainer}>
                          <div className={style.recipeTitle}>
                            {selectedRecipe.recipeName}
                          </div>
                        </div>
                        <div className={style.imageContainer}>
                          <img
                            className={style.image}
                            src={selectedRecipe.imagePath}
                          />
                        </div>

                        <div className={style.heading}>Ingredients:</div>
                        <div className={style.text}>{listIngredients}</div>
                        <div className={style.heading}>Instructions:</div>
                        <ul className={style.instructionsList}>
                          {listInstructions}
                        </ul>
                        <div className={style.heading}>Notes:</div>
                        <div
                          className={style.text}
                          dangerouslySetInnerHTML={{
                            __html: formattedRecipeNotes,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

RecipeSingleView.propTypes = {
  selectedRecipe: PropTypes.object,
  setViewRecipesModal: PropTypes.func,
};

export default RecipeSingleView;
