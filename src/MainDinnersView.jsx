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
  trashCan: ``,
};

const MainDinnersView = () => {
  const [selectedDinners, setSelectedDinners] = useState([]);

  // Read Selected Dinners from Firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allRecipesArr = [];
      let selectedRecipesArr = [];

      querySnapshot.forEach((item) => {
        allRecipesArr.push({ ...item.data(), id: item.id });
      });

      allRecipesArr.map((item) => {
        if (item.thisWeek === true) {
          selectedRecipesArr.push({ ...item, id: item.id });
        }

        setSelectedDinners(selectedRecipesArr);
      });
    });
    return () => unsubscribe();
  }, []);

  //handle trash click (remove from list by changing thisWeek)

  const handleTrashClick = async (item) => {
    await updateDoc(doc(db, "recipes", item.id), {
      thisWeek: !item.thisWeek,
    });
  };

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Weekly Dinners</h3>
      <div className={style.dinnerGrid}>
        {selectedDinners.map((item) => (
          <div className={style.singleDinnerContainer} key={item.id}>
            {item.recipeName}
            <div
              className={style.trashCan}
              onClick={() => handleTrashClick(item)}
            >
              <FaRegTrashAlt />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDinnersView;
