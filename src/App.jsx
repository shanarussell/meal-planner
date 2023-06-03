import GroceryList from "./GroceryList";
import MainDinnersView from "./MainDinnersView";
import MainLunchesView from "./MainLunchesView";
import MainBreakfastsView from "./MainBreakfastsView";
import MainRecipesView from "./MainRecipesView";

const style = {
  bg: `h-screen w-screen p-4 bg-black`,
  mainContainer: `grid grid-cols-4 gap-1`,
  leftContainer: `col-span-1`,
  rightContainer: `col-span-3`,
};

function App() {
  return (
    <div className={style.mainContainer}>
      <div className={style.leftContainer}>
        <GroceryList />
      </div>
      <div className={style.rightContainer}>
        <MainDinnersView />
        <MainLunchesView />
        <MainBreakfastsView />
        <MainRecipesView />
      </div>
    </div>
  );
}

export default App;
