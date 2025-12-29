package com.kasper.gutguide.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kasper.gutguide.model.entity.Recipe;
import com.kasper.gutguide.repository.RecipeRepository;


@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    
    public List<Recipe> getAllRecipes() {
        // Fetch all recipes from the database
        return recipeRepository.findAll();
    }

    public Optional<Recipe> getRecipeById(Long id) {
        // Implementation to fetch a recipe by ID from the database
        return null; // Placeholder return
    }

    public Recipe createRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe cannot be null");
        }
        return recipeRepository.save(recipe);
    }
}
