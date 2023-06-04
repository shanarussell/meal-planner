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
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  dinnerGrid: `flex justify-between`,
  singleDinnerContainer: `border p-4 w-[15%] text-center`,
};

const MainDinnersView = () => {
  const [selectedDinners, setSelectedDinners] = useState([]);

  // Read Selected Dinners from Firebase
  useEffect(() => {
    const q = query(collection(db, "selected-dinners"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let selectedDinnersArr = [];
      querySnapshot.forEach((item) => {
        selectedDinnersArr.push({ ...item.data(), id: item.id });
      });

      setSelectedDinners(selectedDinnersArr);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className={style.container}>
      <h3 className={style.heading}>Weekly Dinners</h3>
      <div className={style.dinnerGrid}>
        {selectedDinners.map((day) => (
          <div className={style.singleDinnerContainer} key={day.id}>
            {day.recipeTitle}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainDinnersView;
