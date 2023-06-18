import { useState, useEffect } from "react";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function useRecipes({user}) {
  

  const userID = user.uid;

  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    if (userID) {
      const q = query(collection(db, `${userID}`));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let allRecipesArray = [];
        querySnapshot.forEach((item) => {
          allRecipesArray.push({ ...item.data(), id: item.id });
        });

        setAllRecipes(allRecipesArray);
      });

      return () => unsubscribe();
    }
  }, [userID]);

  return { allRecipes };
}

export default useRecipes;
