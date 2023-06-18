import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function useCreateRecipe({ fullRecipe, user }) {


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
