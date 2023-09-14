import { useState } from 'react';
import useRecipes from "./hooks/useRecipes";
import PropTypes from "prop-types";


function SearchBar ({user}) {

    const [query, setQuery] = useState("");
    const { allRecipes } = useRecipes({user});
    
    // Extracting recipe titles and converting them to lowercase
    const titles = allRecipes.map((recipe) => recipe.recipeName.toLowerCase());
   
    function search(e){
        e.preventDefault();
        const queryLower = query.toLowerCase();
        console.log(queryLower);

        const matchingTitles = titles.filter((title) => title.includes(queryLower));
        
        console.log("Result: " + matchingTitles);
    }

    return (
        <div className="w-full max-w-xl flex mx-auto p-20 text-xl">
            <input
                type="text"
                className="w-full placeholder-gray-400 text-gray-900 p-4"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            <button className="bg-white p-4" onClick={search}>
                🔍
            </button>
        </div>
    );
}

SearchBar.propTypes = {
    user: PropTypes.object,
};

export default SearchBar;
