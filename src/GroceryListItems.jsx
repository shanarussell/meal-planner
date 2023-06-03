import { FaRegTrashAlt } from "react-icons/fa";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const GroceryListItems = ({
  groceryItem,
  toggleComplete,
  deleteGroceryItem,
}) => {
  return (
    <li className={groceryItem.completed ? style.liComplete : style.li}>
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(groceryItem)}
          type="checkbox"
          checked={groceryItem.completed ? "checked" : ""}
        />
        <p
          onClick={() => toggleComplete(groceryItem)}
          className={groceryItem.completed ? style.textComplete : style.text}
        >
          {groceryItem.text}
        </p>
      </div>
      <button onClick={() => deleteGroceryItem(groceryItem.id)}>
        {<FaRegTrashAlt />}
      </button>
    </li>
  );
};

export default GroceryListItems;
