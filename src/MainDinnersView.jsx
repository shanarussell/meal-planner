import { useState, useEffect } from "react";
import { db } from "./firebase";
import {
  query,
  collection,
  updateDoc,
  doc,
  getDocs, onSnapshot,
} from "firebase/firestore";
import { FaRegTrashAlt } from "react-icons/fa";
import RecipeSingleView from "./RecipeSingleView";
import PropTypes from "prop-types";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-5 h-full w-full`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  dinnerGrid: `flex flex-wrap place-items-center justify-around sm:flex-col lg:flex-row`,
  singleRecipeContainer: `h-64 w-64 bg-[#116A7B] m-3 py-3 px-6 rounded shadow relative`, // Added 'relative' positioning
  singleRecipeImageContainer: `box-border h-36 mt-2 mb-2`,
  thumbnailImage: `h-full w-full object-cover`,
  recipeTitle: `text-md font-bold text-left text-white`,
  trashCan: `absolute bottom-0 right-0 p-2 text-white`, // Added 'absolute' positioning and adjusted alignment
};


const MainDinnersView = ({user}) => {
  //this component displays the weekly dinners section from the database
  //it's looking for isDinner to be set to true
  //isDinner can be set from the new recipe and single recipe views
  //can also use the trash can icon to toggle isDinner and delete it from this view

  const [selectedDinners, setSelectedDinners] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState();
  const [viewRecipesModal, setViewRecipesModal] = useState(false);

  //get userID

  const userID = user.uid;

  

  useEffect(() => {
    // Read all recipes from DB and keep those where isDinner=true
    // Read selected dinners from DB based on userID
    const fetchSelectedDinners = async () => {
      const q = query(collection(db, `${userID}`));
      const querySnapshot = await getDocs(q);

      let selectedRecipesArr = [];

      querySnapshot.forEach((item) => {
        const data = { ...item.data(), id: item.id };
        if (data.isDinner === true) {
          selectedRecipesArr.push(data);
        }
      });

      setSelectedDinners(selectedRecipesArr);
    };

    if (userID) {
      fetchSelectedDinners();
    }

    // listen for changes in the selected dinners collection
    // this allows the section to automatically refresh when a change is made
    const unsubscribe = onSnapshot(collection(db, `${userID}`), () => {
      fetchSelectedDinners();
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [userID]);

  //show a single recipe when clicked
  function handleRecipeClick(item) {
    setSelectedRecipe(item);
    setViewRecipesModal(true);
  }

  //handle trash click (remove from list by changing isDinner)

  const handleTrashClick = async (e, item) => {
    e.stopPropagation();
    await updateDoc(doc(db, `${userID}`, item.id), {
      isDinner: !item.isDinner,
    });
  };

  return (
    <>
      {viewRecipesModal ? (
        <RecipeSingleView
          user = {user}
          selectedRecipe={selectedRecipe}
          setViewRecipesModal={setViewRecipesModal}
        />
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

MainDinnersView.propTypes = {
  user: PropTypes.object,
};

export default MainDinnersView;
