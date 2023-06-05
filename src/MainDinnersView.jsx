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

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  dinnerGrid: `flex justify-between`,
  singleDinnerContainer: `border p-4 w-[15%] text-center`,
  trashCan: `ml-3`,
  singleRecipe: `flex-row bg-[#2EB62C] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
};

const MainDinnersView = () => {
  //this component displays the weekly dinners section from the database
  //it's looking for isDinner to be set to true
  //isDinner can be set from the new recipe and single recipe views
  //can also use the trash can icon to toggle isDinner and delete it from this view

  const [selectedDinners, setSelectedDinners] = useState([]);

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

  //handle trash click (remove from list by changing isDinner)

  const handleTrashClick = async (item) => {
    await updateDoc(doc(db, "recipes", item.id), {
      isDinner: !item.isDinner,
    });
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Weekly Dinners</h3>
      <div className={style.dinnerGrid}>
        {selectedDinners.map((item) => (
          <div className={style.singleRecipe} key={item.id}>
            {item.recipeName}
            <button
              className={style.trashCan}
              onClick={() => handleTrashClick(item)}
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDinnersView;
