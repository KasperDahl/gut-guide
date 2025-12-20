package com.kasper.gutguide.config;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kasper.gutguide.model.entity.Ingredient;
import com.kasper.gutguide.model.entity.Recipe;
import com.kasper.gutguide.repository.RecipeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Configuration
public class DataLoader {
    
    private static final Logger log = LoggerFactory.getLogger(DataLoader.class);
    
    @Bean
    CommandLineRunner initDatabase(RecipeRepository recipeRepository, ObjectMapper objectMapper) {
        return args -> {
            // Only load data if database is empty
            if (recipeRepository.count() > 0) {
                log.info("Database already contains recipes. Skipping data load.");
                return;
            }
            
            try {
                ClassPathResource resource = new ClassPathResource("data/recipes.json");
                List<Map<String, Object>> recipesData = objectMapper.readValue(
                    resource.getInputStream(),
                    new TypeReference<List<Map<String, Object>>>() {}
                );
                
                for (Map<String, Object> recipeData : recipesData) {
                    Recipe recipe = new Recipe();
                    recipe.setName((String) recipeData.get("name"));
                    recipe.setServings((Integer) recipeData.get("servings"));
                    recipe.setMealType((String) recipeData.get("mealType"));
                    recipe.setFullMeal((Boolean) recipeData.getOrDefault("fullMeal", false));
                    recipe.setCalories((Integer) recipeData.get("calories"));
                    recipe.setTimeToCook((Integer) recipeData.get("timeToCook"));
                    recipe.setComments((String) recipeData.get("comments"));
                    recipe.setSource((String) recipeData.get("source"));
                    recipe.setTried((Boolean) recipeData.getOrDefault("tried", false));
                    
                    // Handle instructions
                    @SuppressWarnings("unchecked")
                    List<String> instructions = (List<String>) recipeData.get("instructions");
                    if (instructions != null) {
                        recipe.setInstructions(instructions);
                    }
                    
                    // Handle ingredients
                    @SuppressWarnings("unchecked")
                    List<Map<String, Object>> ingredientsData = 
                        (List<Map<String, Object>>) recipeData.get("ingredients");
                    
                    if (ingredientsData != null) {
                        for (Map<String, Object> ingData : ingredientsData) {
                            Ingredient ingredient = new Ingredient();
                            ingredient.setName((String) ingData.get("name"));
                            
                            // Handle quantity - could be Integer or Double
                            Object quantityObj = ingData.get("quantity");
                            BigDecimal quantity;
                            if (quantityObj instanceof Integer) {
                                quantity = BigDecimal.valueOf((Integer) quantityObj);
                            } else if (quantityObj instanceof Double) {
                                quantity = BigDecimal.valueOf((Double) quantityObj);
                            } else {
                                quantity = new BigDecimal(quantityObj.toString());
                            }
                            ingredient.setQuantity(quantity);
                            ingredient.setUnit((String) ingData.get("unit"));
                            
                            recipe.addIngredient(ingredient);
                        }
                    }
                    
                    recipeRepository.save(recipe);
                }
                
                log.info("Successfully loaded {} recipes from recipes.json", recipesData.size());
                
            } catch (IOException e) {
                log.error("Failed to load recipes from JSON file", e);
            }
        };
    }
}
