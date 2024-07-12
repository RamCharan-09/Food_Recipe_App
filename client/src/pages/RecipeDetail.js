import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './RecipeDetail.css';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await axios.get(`https://recipe-server-red.vercel.app/api/recipe/${id}`);
        setRecipe(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(error.response.data.message || 'Failed to fetch recipe details');
        } else {
          setError('Network error. Please try again later.');
        }
        setLoading(false);
      }
    };
  
    fetchRecipeById();
  }, [id]);
  


  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return null; // Or handle appropriately if recipe is not found

  return (
    <div>
      <h1>{recipe.dishName}</h1>
      <p>{recipe.timeToPrepare}</p>
      <h2>Ingredients</h2>
      <p>{recipe.ingredients}</p>
      <h2>Steps</h2>
      <p>{recipe.steps}</p>
    </div>
  );
};

export default RecipeDetail;
