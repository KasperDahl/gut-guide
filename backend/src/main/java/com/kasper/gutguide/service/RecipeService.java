package com.kasper.gutguide.service;

import java.util.List;
import java.util.Optional;

import com.kasper.gutguide.model.entity.Recipe;

public interface RecipeService {
    List<Recipe> getAllRecipes();
    
    Optional<Recipe> getRecipeById(Long id);

    Recipe createRecipe(Recipe recipe);

    boolean deleteRecipe(Long id);
}