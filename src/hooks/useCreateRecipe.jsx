import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

function useCreateRecipe({ fullRecipe }) {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const userID = user.uid;


  // Create Recipe (add)
  async function createRecipe() {
    await addDoc(collection(db, `${userID}`), {
      recipeName: fullRecipe.recipeName,
      recipeIngredients: fullRecipe.recipeIngredients,
      recipeInstructions: fullRecipe.recipeInstructions,
      recipeNotes: fullRecipe.recipeNotes,
      isDinner: fullRecipe.isDinner,
      imagePath: fullRecipe.imagePath,
    });
  }

  return createRecipe;
}

export default useCreateRecipe;
