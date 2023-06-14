import React from 'react'
import MainDinnersView from './MainDinnersView';
import MainRecipesView from './MainRecipesView';
import GroceryList from './GroceryList';

function Home() {
  return (
    <div>
      <MainDinnersView />
      <MainRecipesView />
      <GroceryList />
    </div>
  );
}

export default Home
