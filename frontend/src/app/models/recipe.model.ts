export interface Recipe {
    id?: number; // Optional for new recipes, required for existing ones
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
    createdAt?: Date;
    updatedAt?: Date;
  }
  
  export interface Ingredient {
    id?: number;
    name: string;
    quantity: number;
    unit: string;
    quantityString: string;
  }