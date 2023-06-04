import RecipeAddNew from "./RecipeAddNew";

const style = {
  modalPosition: `justify-center items-center flex fixed inset-0 z-50 outline-none`,
  modalSize: `relative w-auto mx-20 w-full`,
  modalOuterContainer: `rounded-lg shadow-lg flex flex-col w-full bg-white outline-none`,
  modalHeader: `flex items-start justify-between p-5 border-b rounded-t`,
  modalTitle: `text-3xl font-semibold`,
  modalXButton: `p-1 ml-auto bg-transparent border-0 text-red-500 float-right text-3xl leading-none font-semibold outline-none`,
  modalTextContainer: `relative p-6`,
};

const ModalAddNewRecipe = ({ setNewRecipeModal }) => {
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
              <RecipeAddNew />
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default ModalAddNewRecipe;
