import { useState } from "react";
import { db } from "../firebase";
import { collection, updateDoc, doc, addDoc } from "firebase/firestore";
import { storage } from "../firebase";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

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
