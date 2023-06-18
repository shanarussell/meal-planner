import { db, auth} from "../firebase";
import { updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";


function useEditRecipe({fullRecipe, selectedRecipe}) {

  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

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
