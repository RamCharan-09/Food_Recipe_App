import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import "./CreateRecipe.css";

const API_URL = "https://recipe-server-red.vercel.app/api/recipe"; // Update with your server's API URL

const CreateRecipe = ({ token }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [id, setId] = useState();

  useEffect(() => {
    const id = searchParams.get("id");
    console.log(id);
    if (id) setId(id);
  }, [searchParams]);

  const [recipeData, setRecipeData] = useState({
    dishName: "",
    timeToPrepare: "",
    ingredients: "",
    steps: "",
    image: "",
  });

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

    axios
      .post(API_URL, formData, {
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
            required
          />
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
