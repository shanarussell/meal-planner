import GroceryList from "./GroceryList";
import MainDinnersView from "./MainDinnersView";
import MainRecipesView from "./MainRecipesView";

const style = {
  mainContainer: `bg-[#CDC2AE] flex flex-col pr-5 pl-8 min-h-screen`,
};

function App() {
  return (
    <div className={style.mainContainer}>
        <MainDinnersView />
        <MainRecipesView />
        <GroceryList />
    </div>
  );
}

export default App;
