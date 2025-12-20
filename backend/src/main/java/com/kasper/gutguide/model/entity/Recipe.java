package com.kasper.gutguide.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "recipes")
public class Recipe {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank
    @Column(nullable = false, length = 255)
    private String name;
    
    @ElementCollection
    @CollectionTable(name = "recipe_instructions", joinColumns = @JoinColumn(name = "recipe_id"))
    @Column(name = "instruction", columnDefinition = "TEXT")
    @OrderColumn(name = "instruction_order")
    private List<String> instructions = new ArrayList<>();
    
    // One-way relationship: Recipe owns Ingredients
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "recipe_id", nullable = false)
    private List<Ingredient> ingredients = new ArrayList<>();
    
    @Min(0)
    @Column(nullable = false)
    private Integer servings;
    
    @NotBlank
    @Column(name = "meal_type", nullable = false, length = 50)
    private String mealType;
    
    @Column(name = "full_meal", nullable = false)
    private Boolean fullMeal = false;
    
    @Min(0)
    @Column(nullable = false)
    private Integer calories;
    
    @Min(0)
    @Column(name = "time_to_cook", nullable = false)
    private Integer timeToCook;
    
    @Column(columnDefinition = "TEXT")
    private String comments;
    
    @Column(length = 500)
    private String source;
    
    @Column(nullable = false)
    private Boolean tried = false;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Constructors
    public Recipe() {
    }
    
    public Recipe(String name, Integer servings, String mealType, Integer calories, Integer timeToCook) {
        this.name = name;
        this.servings = servings;
        this.mealType = mealType;
        this.calories = calories;
        this.timeToCook = timeToCook;
    }
    
    // Helper method to add ingredient
    public void addIngredient(Ingredient ingredient) {
        ingredients.add(ingredient);
    }
    
    public void addInstruction(String instruction) {
        this.instructions.add(instruction);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public List<String> getInstructions() {
        return instructions;
    }
    
    public void setInstructions(List<String> instructions) {
        this.instructions = instructions;
    }
    
    public List<Ingredient> getIngredients() {
        return ingredients;
    }
    
    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }
    
    public Integer getServings() {
        return servings;
    }
    
    public void setServings(Integer servings) {
        this.servings = servings;
    }
    
    public String getMealType() {
        return mealType;
    }
    
    public void setMealType(String mealType) {
        this.mealType = mealType;
    }
    
    public Boolean getFullMeal() {
        return fullMeal;
    }
    
    public void setFullMeal(Boolean fullMeal) {
        this.fullMeal = fullMeal;
    }
    
    public Integer getCalories() {
        return calories;
    }
    
    public void setCalories(Integer calories) {
        this.calories = calories;
    }
    
    public Integer getTimeToCook() {
        return timeToCook;
    }
    
    public void setTimeToCook(Integer timeToCook) {
        this.timeToCook = timeToCook;
    }
    
    public String getComments() {
        return comments;
    }
    
    public void setComments(String comments) {
        this.comments = comments;
    }
    
    public String getSource() {
        return source;
    }
    
    public void setSource(String source) {
        this.source = source;
    }
    
    public Boolean getTried() {
        return tried;
    }
    
    public void setTried(Boolean tried) {
        this.tried = tried;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Recipe)) return false;
        Recipe recipe = (Recipe) o;
        return id != null && id.equals(recipe.id);
    }
    
    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}