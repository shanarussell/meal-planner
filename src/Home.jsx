
import MainDinnersView from './MainDinnersView';
import MainRecipesView from './MainRecipesView';
import GroceryList from './GroceryList';
import PropTypes from "prop-types";

function Home({user}) {
  return (
    <div>
      <MainDinnersView user={user} />
      <MainRecipesView user={user} />
      <GroceryList user={user} />
    </div>
  );
}

Home.propTypes = {
  user: PropTypes.object,
}

export default Home
