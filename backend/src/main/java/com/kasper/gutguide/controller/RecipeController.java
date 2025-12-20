package com.kasper.gutguide.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.kasper.gutguide.service.RecipeService;

@RestController
@RequestMapping("/api/recipe")
public class RecipeController {
    RecipeService recipeService;
    

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping("/recipes")
    public String getAllRecipes() {
        recipeService.getAllRecipes();
        return "Hello, World from backend!";
    }

}
