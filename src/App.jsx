import GroceryList from "./GroceryList";
import MainDinnersView from "./MainDinnersView";
import MainRecipesView from "./MainRecipesView";

const style = {
  bg: `h-screen w-screen p-4 bg-black`,
  mainContainer: `bg-[#CDC2AE] flex flex-col pr-5 pl-8`,
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
