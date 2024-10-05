import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatCard,
  MatCardActions,
  MatCardHeader,
  MatCardTitle,
} from '@angular/material/card';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardActions,
  ],
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent {
  recipeForm: FormGroup = this.fb.group({
    name: [''],
    instructions: this.fb.array(['']),
    ingredients: this.fb.array([this.createIngredient()]),
    servings: [null],
    mealType: [''],
    fullMeal: [false],
    calories: [null],
    timeToCook: [null],
    comments: [''],
    source: [''],
    tried: [false],
  });

  constructor(private fb: FormBuilder) {}

  createIngredient(): FormGroup {
    return this.fb.group({
      name: [''],
      quantity: [null],
      unit: [''],
      quantityString: [''],
    });
  }

  // import { Component, OnInit } from '@angular/core';
  // import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
  
  // @Component({
  //   selector: 'app-add-recipe',
  //   templateUrl: './add-recipe.component.html',
  //   styleUrls: ['./add-recipe.component.scss']
  // })
  // export class AddRecipeComponent implements OnInit {
  //   recipeForm: FormGroup;
  //   mealTypes = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  
  //   constructor(private fb: FormBuilder) {
  //     this.createForm();
  //   }
  
  //   ngOnInit(): void {}
  
  //   createForm(): void {
  //     this.recipeForm = this.fb.group({
  //       name: [''],
  //       instructions: this.fb.array(['']),
  //       ingredients: this.fb.array([this.createIngredient()]),
  //       servings: [null],
  //       mealType: [''],
  //       fullMeal: [false],
  //       calories: [null],
  //       timeToCook: [null],
  //       comments: [''],
  //       source: [''],
  //       tried: [false]
  //     });
  //   }
  
  //   createIngredient(): FormGroup {
  //     return this.fb.group({
  //       name: [''],
  //       quantity: [null],
  //       unit: [''],
  //       quantityString: ['']
  //     });
  //   }
  
  //   get instructions(): FormArray {
  //     return this.recipeForm.get('instructions') as FormArray;
  //   }
  
  //   get ingredients(): FormArray {
  //     return this.recipeForm.get('ingredients') as FormArray;
  //   }
  
  //   addInstruction(): void {
  //     this.instructions.push(this.fb.control(''));
  //   }
  
  //   removeInstruction(index: number): void {
  //     this.instructions.removeAt(index);
  //   }
  
  //   addIngredient(): void {
  //     this.ingredients.push(this.createIngredient());
  //   }
  
  //   removeIngredient(index: number): void {
  //     this.ingredients.removeAt(index);
  //   }
  
  //   onSubmit(): void {
  //     if (this.recipeForm.valid) {
  //       console.log(this.recipeForm.value);
  //       // Here you would typically call a service to save the recipe
  //     }
  //   }
  
  //   onDiscard(): void {
  //     this.recipeForm.reset();
  //     // Reset arrays to initial state
  //     while (this.instructions.length > 1) {
  //       this.instructions.removeAt(1);
  //     }
  //     while (this.ingredients.length > 1) {
  //       this.ingredients.removeAt(1);
  //     }
  //   }
  // }
}
