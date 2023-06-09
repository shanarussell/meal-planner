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
  recipeGrid: `flex justify-between`,
  trashCan: `ml-3`,
  singleRecipe: `flex-row bg-[#116A7B] text-white m-3 py-3 px-6 rounded shadow font-bold uppercase text-sm`,
};

const MainLunchesView = () => {
  const [selectedLunches, setSelectedLunches] = useState([]);

  // Read Selected Lunches from Firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allRecipesArr = [];
      let selectedRecipesArr = [];

      querySnapshot.forEach((item) => {
        allRecipesArr.push({ ...item.data(), id: item.id });
      });

      allRecipesArr.map((item) => {
        if (item.isLunch === true) {
          selectedRecipesArr.push({ ...item, id: item.id });
        }

        setSelectedLunches(selectedRecipesArr);
      });
    });
    return () => unsubscribe();
  }, []);

  //handle trash click (remove from list by changing isLunch)

  const handleTrashClick = async (item) => {
    await updateDoc(doc(db, "recipes", item.id), {
      isLunch: !item.isLunch,
    });
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Weekly Lunches</h3>
      <div className={style.recipeGrid}>
        {selectedLunches.map((item) => (
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

export default MainLunchesView;
