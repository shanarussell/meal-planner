import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function useCreateRecipe({ fullRecipe }) {
  // Create Recipe (add)
  async function createRecipe(e) {
    

    await addDoc(collection(db, "recipes"), {
      recipeName: fullRecipe.recipeName,
      recipeIngredients: fullRecipe.recipeIngredients,
      recipeInstructions: fullRecipe.recipeInstructions,
      recipeNotes: fullRecipe.recipeNotes,
      isDinner: fullRecipe.isDinner,
      imagePath: fullRecipe.imagePath,
    });
  }

  return  createRecipe ;
}

export default useCreateRecipe;
