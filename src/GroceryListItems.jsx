import { FaRegTrashAlt } from "react-icons/fa";
import PropTypes from "prop-types";

const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  button: `cursor-pointer flex items-center`,
};

const GroceryListItems = ({
  groceryItem,
  deleteGroceryItem,
}) => {
  return (
    <li className={style.li}>
      <div className={style.row}>
        <p className={style.text}>{groceryItem}</p>
      </div>
      <button onClick={() => deleteGroceryItem(groceryItem.id)}>
        {<FaRegTrashAlt />}
      </button>
    </li>
  );
};

GroceryListItems.propTypes = {
  groceryItem: PropTypes.object,
  deleteGroceryItem: PropTypes.func,
};

export default GroceryListItems;
