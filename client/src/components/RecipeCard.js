import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import "../pages/RecipeDetail";
import axios from "axios";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const RecipeCard = ({ recipe }) => {
  const defaultImage = "default-image.jpg"; // Replace with your default image path
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [like, setLike] = useState(false);
  const [likes, setLikes] = useState(recipe.likes.length);

  useEffect(() => {
    const id = localStorage.getItem("id");

    setAuthor(id);
    if (recipe.likes.includes(id)) {
      setLike(true);
    }
  }, [recipe]);

  const handleClick = () => {
    navigate(`/recipe/${recipe._id}`);
  };

  async function edit() {
    navigate(`/edit-recipe/${recipe._id}`);
  }

  async function deleteRecipe() {
    axios
      .delete("https://recipe-server-red.vercel.app/" + recipe._id, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        window.location.reload();
      });
  }

  async function likeRecipe() {
    const id = localStorage.getItem("id");
    if (!id) navigate("/login");

    setLike(!like);
    setLikes(like ? likes - 1 : likes + 1);

    const API_URL = "https://recipe-server-red.vercel.app/api/recipe/like/" + recipe._id; // Update with your server's API URL

    const token = localStorage.getItem("token");

    axios
      .put(
        API_URL,
        {},
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        navigate("/"); // Redirect to home page after successful creation
      })
      .catch((err) => {
        console.log(err);
        // Handle error state or show error message to the user
      });
  }

  return (
    <div className="recipe-card">
      <div
        style={{
          cursor: "pointer",
        }}
      >
        <div>
          <img
            width={10}
            height={10}
            src={recipe.image || defaultImage}
            alt={recipe.dishName}
            onClick={handleClick}
          />
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{ flex: 1 }}
              onClick={handleClick}
              className="recipe-info"
            >
              <h3>{recipe.dishName}</h3>
              <p>Time to prepare: {recipe.timeToPrepare}</p>
              <p>Author: {recipe.author.username}</p>
            </div>
            <div
              style={{
                padding: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ paddingRight: "2px" }}>{likes}</span>
              {!like ? (
                <FavoriteBorderOutlinedIcon onClick={likeRecipe} />
              ) : (
                <FavoriteOutlinedIcon onClick={likeRecipe} />
              )}
            </div>
          </div>
        </div>
      </div>
      {author && author === recipe.author._id && (
        <div className="recipe-actions">
          <button onClick={edit}>Edit</button>
          <button onClick={deleteRecipe}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default RecipeCard;
