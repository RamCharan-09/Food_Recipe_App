const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../controllers/recipe");
const { authenticate } = require("../middlewares/authMiddleware");
const { upload } = require("../middlewares/multer");

recipeRouter.get("/", recipeController.getAllRecipes);

recipeRouter.get("/:id", recipeController.getRecipesById);

recipeRouter.post(
  "/",
  authenticate,
  upload.single("image"),
  recipeController.createRecipe
);

recipeRouter.put("/like/:id", authenticate, recipeController.like);

recipeRouter.patch(
  "/:id",
  authenticate,
  upload.single("image"),
  recipeController.updateRecipe
);

recipeRouter.delete("/:id", authenticate, recipeController.deleteRecipe);

module.exports = recipeRouter;
