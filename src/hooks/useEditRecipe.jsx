import { db} from "../firebase";
import { updateDoc, doc } from "firebase/firestore";


function useEditRecipe({fullRecipe, selectedRecipe, user}) {


  const userID = user.uid;

  
  const editRecipe = async () => {
    
    await updateDoc(doc(db, `${userID}`, selectedRecipe.id), {
      recipeName: fullRecipe.recipeName,
      recipeIngredients: fullRecipe.recipeIngredients,
      recipeInstructions: fullRecipe.recipeInstructions,
      recipeNotes: fullRecipe.recipeNotes,
      isDinner: fullRecipe.isDinner,
      imagePath: fullRecipe.imagePath,
    });
    
  };


  return editRecipe;
}

export default useEditRecipe
