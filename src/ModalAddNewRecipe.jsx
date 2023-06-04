import React from "react";

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

const ModalAddNewRecipe = ({ newRecipeModal, setNewRecipeModal }) => {
  return (
    <>
      <div className={style.modalContainer}>
        <div className={style.modalSize}>
          {/*content*/}
          <div className={style.modalCharacteristics}>
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
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything.
              </p>
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything.
              </p>
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                I always felt like I could do anything. That’s the main thing
                people are controlled by! Thoughts- their perception of
                themselves! They're slowed down by their perception of
                themselves. If you're taught you can’t do anything, you won’t do
                anything. I was taught I could do everything.
              </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setNewRecipeModal(false)}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setNewRecipeModal(false)}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalAddNewRecipe;
