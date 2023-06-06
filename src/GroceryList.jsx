import { useState, useEffect } from "react";
import { AiOutlinePlus, AiOutlineCloseSquare } from "react-icons/ai";
import { FaRegTrashAlt  } from "react-icons/fa";
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
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#5D9C59] text-slate-100`,
  groceryItemContainer: `flex flex-row flex-wrap mt-4`,
  groceryItem: `flex flex-row border bg-[#5D9C59] rounded-lg shadow align-middle mr-2 mt-2`,
  groceryItemText: `text-slate-100 ml-5 mt-3 uppercase font-bold`,
  trashButton: `ml-5 pr-3 mt-3 mb-3 text-stone-900 text-2xl`,
  count: `text-center p-2`,
};

function GroceryList() {
  const [groceryItems, setgroceryItems] = useState([]);
  const [input, setInput] = useState("");

  // Create Grocery Item (add)
  const createGroceryItem = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid grocery item");
      return;
    }
    await addDoc(collection(db, "grocery-item"), {
      groceryItem: input,
    });
    setInput("");
  };

  // Read Grocery Item from Firebase
  useEffect(() => {
    const q = query(collection(db, "grocery-item"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let groceriesArr = [];
      querySnapshot.forEach((item) => {
        groceriesArr.push({ ...item.data(), id: item.id });
      });
      setgroceryItems(groceriesArr);
    });
    return () => unsubscribe();
  }, []);

  // Delete Grocery Item
  const deleteGroceryItem = async (id) => {
    await deleteDoc(doc(db, "grocery-item", id));
  };

  return (
    <div>
      <div className={style.container}>
        <h3 className={style.heading}>Grocery List</h3>
        <form onSubmit={createGroceryItem} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Grocery Item"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>

        <div className={style.groceryItemContainer}>
          {groceryItems.map((groceryItem, id) => (
            <div className={style.groceryItem} key={id}>
              <div className={style.groceryItemText}>
                {groceryItem.groceryItem}
              </div>
              <button
                className={style.trashButton}
                onClick={() => deleteGroceryItem(groceryItem.id)}
              >
                {<AiOutlineCloseSquare />}
              </button>
            </div>
          ))}
        </div>

        {groceryItems.length < 1 ? null : (
          <p
            className={style.count}
          >{`You have ${groceryItems.length} grocery list items`}</p>
        )}
      </div>
    </div>
  );
}

export default GroceryList;
