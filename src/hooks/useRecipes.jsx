import { useState, useEffect } from "react";
import { db } from "../firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

function useRecipes() {
  // initialize state
  const [allRecipes, setAllRecipes] = useState([]);
  // create any functions we need for modifying the state
  // Read Recipes from Firebase
  useEffect(() => {
    const q = query(collection(db, "recipes"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let allRecipesArray = [];
      querySnapshot.forEach((item) => {
        allRecipesArray.push({ ...item.data(), id: item.id });
      });

      setAllRecipes(allRecipesArray);
    });
    return () => unsubscribe();
  }, []);
  // return whatever we want another component to have access to (count, increment)

  return { allRecipes };
}

export default useRecipes;
