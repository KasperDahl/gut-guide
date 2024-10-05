import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: [''],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([]),
      servings: [''],
      mealType: [''],
      fullMeal: [''],
      tried: [''],
      comments: ['']
    });
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addInstruction(): void {
    this.instructions.push(new FormControl(''));
  }

  addIngredient(): void {
    this.ingredients.push(this.fb.group({
      name: [''],
      quantity: [''],
      unit: ['']
    }));
  }

  saveRecipe(): void {
    console.log(this.recipeForm.value);
  }

  discardRecipe(): void {
    this.recipeForm.reset();
  }
}
