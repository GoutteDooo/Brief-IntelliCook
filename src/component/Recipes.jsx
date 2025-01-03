import React from "react";
import recettes from "../data/recipes.json";
import Recipe from "./Recipe";

const Recipes = () => {
  const findRecipe = (recipeName) => {
    return recettes.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(recipeName.toLowerCase())
    );
  };

  console.log(findRecipe("Salade composée"));

  return (
    <div>
      {findRecipe("rata") &&
        findRecipe("rata").map((recipe) => (
          <Recipe key={recipe.id} recipe={recipe} />
        ))}
    </div>
  );
};

export default Recipes;
