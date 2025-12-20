package com.kasper.gutguide.repository;

import com.kasper.gutguide.model.entity.Recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    
    List<Recipe> findByMealType(String mealType);
    
    List<Recipe> findByTried(Boolean tried);
    
    List<Recipe> findByFullMeal(Boolean fullMeal);
    
    List<Recipe> findByNameContainingIgnoreCase(String name);
}
