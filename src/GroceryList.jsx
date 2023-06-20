import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AiOutlinePlus, AiOutlineCloseSquare } from "react-icons/ai";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const style = {
  container: `bg-slate-100 rounded-md shadow-xl p-4 mr-8 mt-8 w-full`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-[#116A7B] text-slate-100`,
  groceryItemContainer: `flex flex-row flex-wrap mt-4`,
  groceryItem: `flex flex-row grow border bg-[#116A7B] rounded-lg shadow align-middle mr-2 mt-2`,
  bottomButtonContainer: `flex flex-col mt-2`,
  deleteAllButton: `bg-[#DF2E38] text-slate-100 rounded-lg shadow align-middle p-3 font-bold`,
  groceryItemText: `text-slate-100 ml-1 mt-3 mr-3 uppercase font-bold`,
  xButton: `ml-3 pr-3 mt-3 mb-3 text-white text-2xl`,
  count: `text-center p-2`,
};

function GroceryList({user}) {
  const [groceryItems, setgroceryItems] = useState([]);
  const [input, setInput] = useState("");

  // Create Grocery Item (add)
  const createGroceryItem = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid grocery item");
      return;
    }
    await addDoc(collection(db, `list${user.uid}`), {
      groceryItem: input,
    });
    setInput("");
  };

  // Read Grocery Item from Firebase
  useEffect(() => {
    const q = query(collection(db, `list${user.uid}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let groceriesArr = [];
      querySnapshot.forEach((item) => {
        groceriesArr.push({ ...item.data(), id: item.id });
      });
      setgroceryItems(groceriesArr);
    });
    return () => unsubscribe();
  }, [user.uid]);

  // Delete Grocery Item
  const deleteGroceryItem = async (id) => {
    await deleteDoc(doc(db, `list${user.uid}`, id));
  };

  // Delete All Grocery Items
  const deleteAllGroceryItems = async () => {
    const groceryCollectionRef = collection(db, `list${user.uid}`);
    const querySnapshot = await getDocs(groceryCollectionRef);

    querySnapshot.forEach((doc) => {
      deleteDoc(doc.ref);
    });
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
              <button
                className={style.xButton}
                onClick={() => deleteGroceryItem(groceryItem.id)}
              >
                {<AiOutlineCloseSquare />}
              </button>
              <div className={style.groceryItemText}>
                {groceryItem.groceryItem}
              </div>
            </div>
          ))}
        </div>

        <div className={style.bottomButtonContainer}>
          <button
            className={style.deleteAllButton}
            onClick={deleteAllGroceryItems}
          >
            Delete ALL items from grocery list
          </button>
        </div>
      </div>
    </div>
  );
}

GroceryList.propTypes = {
  user: PropTypes.object,
};

export default GroceryList;
