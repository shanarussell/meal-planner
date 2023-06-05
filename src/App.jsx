import GroceryList from "./GroceryList";
import MainDinnersView from "./MainDinnersView";
import MainLunchesView from "./MainLunchesView";
import MainBreakfastsView from "./MainBreakfastsView";
import MainRecipesView from "./MainRecipesView";

const style = {
  bg: `h-screen w-screen p-4 bg-black`,
  mainContainer: `flex flex-col pr-5 pl-8`,
};

function App() {
  return (
    <div className={style.mainContainer}>
        <MainDinnersView />
        <MainLunchesView />
        <MainBreakfastsView />
        <MainRecipesView />
        <GroceryList />
    </div>
  );
}

export default App;
