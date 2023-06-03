import { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import GroceryListItems from "./GroceryListItems";
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
  container: `bg-slate-100 max-w-[90%] rounded-md shadow-xl p-4 ml-4 mr-4 mt-8`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#2EB62C] text-slate-100`,
  count: `text-center p-2`,
};

function GroceryList() {
  const [groceryItems, setgroceryItems] = useState([]);
  const [input, setInput] = useState("");

  // Create Grocery Item (add)
  const createGroceryItem = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db, "grocery-item"), {
      text: input,
      completed: false,
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

  // Update Grocery Item in Firebase
  const toggleComplete = async (groceryItem) => {
    await updateDoc(doc(db, "grocery-item", groceryItem.id), {
      completed: !groceryItem.completed,
    });
  };

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
        <ul>
          {groceryItems.map((groceryItem, id) => (
            <GroceryListItems
              key={id}
              groceryItem={groceryItem}
              toggleComplete={toggleComplete}
              deleteGroceryItem={deleteGroceryItem}
            />
          ))}
        </ul>
        {groceryItems.length < 1 ? null : (
          <p
            className={style.count}
          >{`You have ${groceryItems.length} groceryItems`}</p>
        )}
      </div>
    </div>
  );
}

export default GroceryList;
