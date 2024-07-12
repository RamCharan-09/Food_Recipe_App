import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./CreateRecipe.css";

const EditRecipe = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [recipeData, setRecipeData] = useState({
    dishName: "",
    timeToPrepare: "",
    ingredients: "",
    steps: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeById = async () => {
      try {
        const response = await axios.get(
          `https://recipe-server-red.vercel.app/api/recipe/${id}`
        );
        setRecipeData(response.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          setError(
            error.response.data.message || "Failed to fetch recipe details"
          );
        } else {
          setError("Network error. Please try again later.");
        }
        setLoading(false);
      }
    };

    fetchRecipeById();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipeData({
      ...recipeData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setRecipeData({
      ...recipeData,
      image: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("dishName", recipeData.dishName);
    formData.append("timeToPrepare", recipeData.timeToPrepare);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("steps", recipeData.steps);
    formData.append("image", recipeData.image);

    const API_URL = "https://recipe-server-red.vercel.app/api/recipe/" + id; // Update with your server's API URL

    axios
      .patch(API_URL, formData, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        navigate("/"); // Redirect to home page after successful creation
      })
      .catch((err) => {
        console.log(err);
        // Handle error state or show error message to the user
      });
  };

  return (
    <div className="create-recipe-container">
      <h2>Create New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="dishName">Dish Name:</label>
          <input
            type="text"
            id="dishName"
            name="dishName"
            value={recipeData.dishName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeToPrepare">Time to Prepare:</label>
          <input
            type="text"
            id="timeToPrepare"
            name="timeToPrepare"
            value={recipeData.timeToPrepare}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="steps">Steps to Prepare:</label>
          <textarea
            id="steps"
            name="steps"
            value={recipeData.steps}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  );
};

export default EditRecipe;
