export interface Recipe {
    name: string;
    instructions: string[];
    ingredients: Ingredient[];
    servings: number;
    mealType: string;
    fullMeal: boolean;
    calories: number;
    timeToCook: number;
    comments: string;
    source: string;
    tried: boolean;
  }
  
  export interface Ingredient {
    name: string;
    quantity: number;
    unit: string;
    quantityString: string;
  }