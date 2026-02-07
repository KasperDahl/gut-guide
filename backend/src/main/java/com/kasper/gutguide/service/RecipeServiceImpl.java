package com.kasper.gutguide.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kasper.gutguide.model.entity.Recipe;
import com.kasper.gutguide.repository.RecipeRepository;

import jakarta.validation.constraints.NotNull;

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
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return recipeRepository.findById(id);
    }

    public Recipe createRecipe(Recipe recipe) {
        if (recipe == null) {
            throw new IllegalArgumentException("Recipe cannot be null");
        }
        return recipeRepository.save(recipe);
    }

    public boolean deleteRecipe(Long id) {
        if (id == null) {
            return false;
        }
        recipeRepository.deleteById(id);
        return true;
    }

    public Optional<Recipe> updateRecipe(Long id, Recipe updatedRecipe) {
        if (id == null || updatedRecipe == null) {
            throw new IllegalArgumentException("ID and updated recipe cannot be null");
        }

        return recipeRepository.findById(id).map(existingRecipe -> {
            // Update fields of the existing recipe with values from the updated recipe
            existingRecipe.setName(updatedRecipe.getName());
            existingRecipe.setServings(updatedRecipe.getServings());
            existingRecipe.setMealType(updatedRecipe.getMealType());
            existingRecipe.setFullMeal(updatedRecipe.getFullMeal());
            existingRecipe.setTimeToCook(updatedRecipe.getTimeToCook());
            existingRecipe.setComments(updatedRecipe.getComments());
            existingRecipe.setSource(updatedRecipe.getSource());
            existingRecipe.setTried(updatedRecipe.getTried());

            existingRecipe.getIngredients().clear();
            existingRecipe.getIngredients().addAll(updatedRecipe.getIngredients());
            existingRecipe.getInstructions().clear();
            existingRecipe.getInstructions().addAll(updatedRecipe.getInstructions());

            return recipeRepository.save(existingRecipe);
        });
    }
}
