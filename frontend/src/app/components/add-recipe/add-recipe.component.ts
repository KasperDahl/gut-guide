import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, Ingredient } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
// import { RecipeService } from '../../services/recipe.service'; // TODO: Import your actual service

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;
  recipeId?: number;

  // Dropdown options for units
  units: string[] = [
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'pcs',
    'oz',
    'lb',
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  )
  {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      instructions: this.fb.array([]),
      ingredients: this.fb.array([]),
      servings: [0, [Validators.required, Validators.min(0)]],
      mealType: ['', Validators.required],
      fullMeal: [false],
      timeToCook: [0, Validators.min(0)],
      comments: [''],
      source: [''],
      tried: [false],
    });
  }

  ngOnInit(): void {
    // Check route parameters to see if we are editing an existing recipe
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.recipeId = +params['id'];
        // TODO: Call service to get recipe by ID and populate form
        // this.loadRecipe(this.recipeId);
      } else {
        // Initialize with one empty row for new recipes
        this.addInstruction();
        this.addIngredient();
      }
    });
  }

  // --- Getters for FormArrays ---
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // --- Instructions Management ---
  addInstruction(value: string = ''): void {
    this.instructions.push(this.fb.control(value, Validators.required));
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  // --- Ingredients Management ---
  addIngredient(ingredient?: Ingredient): void {
    const group = this.fb.group({
      id: [ingredient?.id || null], // Keep ID if editing
      name: [ingredient?.name || '', Validators.required],
      quantity: [
        ingredient?.quantity || null,
        [Validators.required, Validators.min(0)],
      ],
      unit: [ingredient?.unit || 'pcs'],
    });
    this.ingredients.push(group);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  // --- Submission ---
  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.recipeForm.markAllAsTouched();
      return;
    }

    const formValue = this.recipeForm.value;

    // Construct the Recipe object
    const recipe: Recipe = {
      ...formValue,
      id: this.recipeId, // Ensure ID is present if editing
    };

    console.log('Submitting Recipe:', recipe);

    if (this.isEditMode) {
      // this.recipeService.update(recipe).subscribe(...)
    } else {
      this.recipeService.createRecipe(recipe).subscribe(response => console.log("Backend response from creating recipe: ", response))
    }
  }

  /* Helper to populate form when editing
  private loadRecipe(id: number) {
    this.recipeService.getRecipe(id).subscribe((data: Recipe) => {
      this.recipeForm.patchValue(data);
      
      // Clear and repopulate arrays
      this.instructions.clear();
      data.instructions.forEach(inst => this.addInstruction(inst));
      
      this.ingredients.clear();
      data.ingredients.forEach(ing => this.addIngredient(ing));
    });
  } */
}
