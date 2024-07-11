import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import { getRecipes } from '../services/service';
import RecipeCard from '../components/RecipeCard';
// import dummyRecipes from './dummy';
import './Home.modules.css';


const Home = () => {

  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await getRecipes();
        setRecipes(result);
        setFilteredRecipes(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleSearch = (query) => {
    const filtered = recipes.filter(recipe => 
      recipe.dishName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  return (
    <div className="home-container">
      
      
      <SearchBar onSearch={handleSearch} />
      <div className="recipe-grid">
      {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
