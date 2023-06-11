import PropTypes from "prop-types";
import { useState } from "react";
import { db } from "./firebase";
import { collection, updateDoc, doc, addDoc } from "firebase/firestore";
import { storage } from "./firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

const style = {
  modalPosition: `justify-center items-center flex fixed inset-0 z-50 outline-none`,
  modalSize: `relative w-auto mx-20 w-full max-h-full overflow-auto`,
  modalOuterContainer: `mt-5 rounded-lg shadow-lg flex flex-col w-full bg-white outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none`,
  modalTextContainer: `relative p-6`,
  container: `flex-col bg-slate-100 w-full rounded-md shadow-xl p-4`,
  heading: `text-xl font-bold text-left text-gray-800 p-2`,
  inputRecipeName: `border p-2 w-1/2 text-xl mb-4`,
  inputTextAreas: `border p-2 w-full text-xl mb-4`,
  greenTab: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-t-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150`,
  whiteTab: `bg-white text-[#116A7B] active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-t-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-0 ease-linear transition-all duration-150`,
  submitButton: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
  checkboxesContainer: `flex flex-col`,
  checkboxes: `text-lg font-bold text-left text-gray-800 mt-3`,
  imageUploadContainer: `flex flex-col bg-slate-200 p-5`,
  imageFileUpload: `block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-[#116A7B] file:text-white
      hover:file:bg-violet-100`,
  imageUploadButton: `bg-[#116A7B] text-white active:bg-pink-600 font-bold uppercase text-sm mt-2 px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`,
};

const ModalAddEditRecipe = ({
  setNewRecipeModal,
  selectedRecipe,
  editMode,
  setViewRecipesModal,
}) => {
  //launches from MainRecipesView
  //setNewRecipe prop is a boolean that sets whether the modal is open or not
  let imagePlaceholderURL =
    "https://firebasestorage.googleapis.com/v0/b/meal-planner-app-4dcec.appspot.com/o/placeholder%2Fplaceholder.jpg?alt=media&token=0fb58b54-01a3-4709-8f42-663da10691e9";

  //if we're in edit mode, set fullRecipe to selectedRecipe. Otherwise, set it as blank values
  const [fullRecipe, setFullRecipe] = useState(() => {
    if (editMode) {
      return {
        recipeName: selectedRecipe.recipeName,
        recipeIngredients: selectedRecipe.recipeIngredients,
        recipeInstructions: selectedRecipe.recipeInstructions,
        recipeNotes: selectedRecipe.recipeNotes,
        isDinner: selectedRecipe.isDinner,
        imagePath: selectedRecipe.imagePath,
      };
    } else {
      return {
        recipeName: "",
        recipeIngredients: [],
        recipeInstructions: [],
        recipeNotes: "",
        isDinner: false,
        imagePath: imagePlaceholderURL,
      };
    }
  });

  const [formatIngredients, setFormatIngredients] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUploadedState, setImageUploadedState] = useState(false);
  const [isDinnerChecked, setIsDinnerChecked] = useState(
    editMode ? selectedRecipe.isDinner : false
  );

  let recipeTitlePlaceholder = "Add Recipe Title";
  let recipeInstructionsPlaceholder =
    "Add instructions with each step separated by a comma";
  let recipeNotesPlaceholder = "Add Notes with each step separated by a comma";

  // Create Recipe (add)
  const createRecipe = async (e) => {
    e.preventDefault(e);

    await addDoc(collection(db, "recipes"), {
      recipeName: fullRecipe.recipeName,
      recipeIngredients: fullRecipe.recipeIngredients,
      recipeInstructions: fullRecipe.recipeInstructions,
      recipeNotes: fullRecipe.recipeNotes,
      isDinner: fullRecipe.isDinner,
      imagePath: fullRecipe.imagePath,
    });
    setNewRecipeModal(false);
  };

  //upload image to firebase
  //make sure image isn't empty
  //make sure recipe has a title
  //upload using the recipe name as the path
  const uploadImage = (event) => {
    event.preventDefault(event);
    if (imageUpload == null) return;
    if (fullRecipe.recipeName === "") {
      alert("Please enter a recipe name before uploading a photo");
      return;
    }

    const imageRef = ref(
      storage,
      `${fullRecipe.recipeName}/${imageUpload.name}`
    );
    uploadBytes(imageRef, imageUpload).then(() => {
      setImageUploadedState(true);
      getDownloadURL(
        uploadBytesResumable(imageRef, imageUpload).snapshot.ref
      ).then((url) =>
        setFullRecipe((prevRecipe) => ({ ...prevRecipe, imagePath: url }))
      );
    });
  };

  //edit recipe in Database
  const editRecipe = async (event) => {
    event.preventDefault(event);
    await updateDoc(doc(db, "recipes", selectedRecipe.id), {
      recipeName: fullRecipe.recipeName,
      recipeIngredients: fullRecipe.recipeIngredients,
      recipeInstructions: fullRecipe.recipeInstructions,
      recipeNotes: fullRecipe.recipeNotes,
      isDinner: fullRecipe.isDinner,
      imagePath: fullRecipe.imagePath,
    });
    setViewRecipesModal(false);
  };

  const closeModal = () => {
    {
      editMode ? setViewRecipesModal(false) : setNewRecipeModal(false);
    }
  };

  function pasteFromWeb() {
    return (
      <div>
        <textarea
          value={fullRecipe.recipeIngredients}
          onChange={(e) =>
            setFullRecipe((prevRecipe) => ({
              ...prevRecipe,
              recipeIngredients: e.target.value
                .replace(/-/g, " ")
                .replace(/•/g, "")
                .replace(/\u25A2/g, "")
                .replace(/\*/g, "") //replace *
                .replace(/http\S+/g, "") // replace for URLs starting with "http"
                .replace(/\[/g, "") // replace "["
                .replace(/\]/g, "") // replace "]"
                .split(/[,\n]/),
            }))
          }
          className={style.inputTextAreas}
          rows={"5"}
          placeholder={
            editMode
              ? selectedRecipe.recipeIngredients
              : "Paste list from web to be auto-formatted. Removes dashes, bullet points, brackets, boxes, asteriks and urls"
          }
        />
      </div>
    );
  }

  function pasteManually(){
    return (
      <div>
        <textarea
          value={fullRecipe.recipeIngredients}
          onChange={(e) =>
            setFullRecipe((prevRecipe) => ({
              ...prevRecipe,
              recipeIngredients: e.target.value
                .split(","),
            }))
          }
          className={style.inputTextAreas}
          rows={"5"}
          placeholder={
            editMode
              ? selectedRecipe.recipeIngredients
              : "Type in ingredients separated with commas"
          }
        />
      </div>
    );

  }

  return (
    <>
      <div className={style.modalPosition}>
        <div className={style.modalSize}>
          {/*content*/}
          <div className={style.modalOuterContainer}>
            {/*header*/}
            <div className={style.modalHeader}>
              <h3 className={style.modalTitle}>
                {editMode ? "Edit Recipe" : "Add new recipe"}
              </h3>
              <button className={style.modalXButton} onClick={closeModal}>
                ×
              </button>
            </div>
            {/*body*/}

            <div className={style.modalTextContainer}>
              <div className={style.container}>
                <form>
                  <h3 className={style.heading}>Recipe Name:</h3>
                  <input
                    value={fullRecipe.recipeName}
                    onChange={(e) =>
                      setFullRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        recipeName: e.target.value,
                      }))
                    }
                    className={style.inputRecipeName}
                    type="text"
                    placeholder={
                      editMode
                        ? selectedRecipe.recipeName
                        : recipeTitlePlaceholder
                    }
                  />
                  <h3 className={style.heading}>Ingredients:</h3>
                  <button
                    className={
                      (formatIngredients === "web" || formatIngredients === "")
                        ? style.greenTab
                        : style.whiteTab
                    }
                    onClick={(e) => {
                      e.preventDefault(e);
                      setFormatIngredients("web");
                    }}
                  >
                    Paste ingredients from web
                  </button>

                  <button
                    className={
                      formatIngredients === "manual"
                        ? style.greenTab
                        : style.whiteTab
                    }
                    onClick={(e) => {
                      e.preventDefault(e);
                      setFormatIngredients("manual");
                    }}
                  >
                    Type ingredients manually
                  </button>

                  {formatIngredients === "manual" && pasteManually()}
                  {(formatIngredients === "web" ||
                    formatIngredients === "") && pasteFromWeb()}

                  <h3 className={style.heading}>Cooking Instructions:</h3>
                  <textarea
                    value={fullRecipe.recipeInstructions}
                    onChange={(e) =>
                      setFullRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        recipeInstructions: e.target.value
                          .replace(/-/g, " ")
                          .replace(/•/g, "")
                          .replace(/\u25A2/g, "")
                          .split(/[.\n]/),
                      }))
                    }
                    className={style.inputTextAreas}
                    rows={"7"}
                    placeholder={
                      editMode
                        ? selectedRecipe.recipeInstructions
                        : recipeInstructionsPlaceholder
                    }
                  />
                  <h3 className={style.heading}>Notes, links, etc:</h3>
                  <textarea
                    value={fullRecipe.recipeNotes}
                    onChange={(e) =>
                      setFullRecipe((prevRecipe) => ({
                        ...prevRecipe,
                        recipeNotes: e.target.value,
                      }))
                    }
                    className={style.inputTextAreas}
                    rows={"7"}
                    placeholder={
                      editMode
                        ? selectedRecipe.recipeNotes
                        : recipeNotesPlaceholder
                    }
                  />
                  <div className={style.imageUploadContainer}>
                    <div className={style.imageUploadContainer}>
                      {imageUpload && (
                        <div>
                          <p>Selected image: {imageUpload.name}</p>
                          <button
                            className={style.imageUploadButton}
                            onClick={uploadImage}
                          >
                            Upload Image
                          </button>
                        </div>
                      )}
                      {!imageUpload && (
                        <input
                          className={style.imageFileUpload}
                          onChange={(event) => {
                            setImageUpload(event.target.files[0]);
                          }}
                          type="file"
                        />
                      )}
                      {imageUploadedState && <p>Image Uploaded Successfully</p>}
                    </div>
                  </div>
                  <div className={style.checkboxesContainer}>
                    <label className={style.checkboxes}>
                      <input
                        type="checkbox"
                        checked={isDinnerChecked}
                        onChange={() => {
                          setIsDinnerChecked((prevState) => !prevState);
                          setFullRecipe((prevRecipe) => ({
                            ...prevRecipe,
                            isDinner: !prevRecipe.isDinner,
                          }));
                        }}
                        className={style.checkboxes}
                      />{" "}
                      Add to this weeks dinners?
                    </label>
                  </div>
                  <br />
                  <button
                    className={style.submitButton}
                    onClick={editMode ? editRecipe : createRecipe}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-50 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

ModalAddEditRecipe.propTypes = {
  setNewRecipeModal: PropTypes.func,
  setViewRecipesModal: PropTypes.func,
  selectedRecipe: PropTypes.object,
  editMode: PropTypes.bool,
};

export default ModalAddEditRecipe;
