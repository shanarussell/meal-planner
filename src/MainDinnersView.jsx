import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import RecipeSingleView from "./RecipeSingleView";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8 w-full`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  dinnerGrid: `flex flex-wrap sm:flex-col lg:flex-row lg:justify-around sm:place-items-center md:place-items-center `,
  singleRecipeContainer: `h-64 w-64 bg-[#116A7B] m-3 py-3 px-6 rounded shadow relative`, // Added 'relative' positioning
  singleRecipeImageContainer: `box-border h-36 mt-2 mb-2`,
  thumbnailImage: `h-full w-full object-cover`,
  recipeTitle: `text-md font-bold text-left text-white`,
  trashCan: `absolute bottom-0 right-0 p-2 text-white`, // Added 'absolute' positioning and adjusted alignment
};


const MainDinnersView = () => {
  //this component displays the weekly dinners section from the database
  //it's looking for isDinner to be set to true
  //isDinner can be set from the new recipe and single recipe views
  //can also use the trash can icon to toggle isDinner and delete it from this view

  const [selectedDinners, setSelectedDinners] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [viewRecipesModal, setViewRecipesModal] = useState(false);


  // Read all recipes from DB and keep those where isDinner=true
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allRecipesArr = [];
      let selectedRecipesArr = [];

      querySnapshot.forEach((item) => {
        allRecipesArr.push({ ...item.data(), id: item.id });
      });

      allRecipesArr.map((item) => {
        if (item.isDinner === true) {
          selectedRecipesArr.push({ ...item, id: item.id });
        }

        setSelectedDinners(selectedRecipesArr);
      });
    });
    return () => unsubscribe();
  }, []);

  //show a single recipe when clicked
  function handleRecipeClick (item){
    setSelectedRecipe(item)
    setViewRecipesModal(true)
  }

  //<RecipeSingleView selectedRecipe={item} setViewRecipesModal={true}/>

  //handle trash click (remove from list by changing isDinner)

  const handleTrashClick = async (e, item) => {
    e.stopPropagation();
    await updateDoc(doc(db, "recipes", item.id), {
      isDinner: !item.isDinner,
    });
  };

  return (
    <>
      {viewRecipesModal ? (
        <RecipeSingleView selectedRecipe={selectedRecipe} setViewRecipesModal={setViewRecipesModal} />
      ) : (
        <div className={style.container}>
          <h3 className={style.heading}>Weekly Dinners</h3>
          <div className={style.dinnerGrid}>
            {selectedDinners.map((item) => (
              <div
                className={style.singleRecipeContainer}
                key={item.id}
                onClick={() => handleRecipeClick(item)}
              >
                <div className={style.singleRecipeImageContainer}>
                  <img className={style.thumbnailImage} src={item.imagePath} />
                </div>
                <div className={style.recipeTitle}> {item.recipeName}</div>
                <div className={style.trashCan}>
                  <button onClick={(e) => handleTrashClick(e, item)}>
                    <FaRegTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MainDinnersView;
