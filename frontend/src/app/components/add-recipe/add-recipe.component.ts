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
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Recipe, Ingredient } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { LookupService } from '../../services/lookup.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DragDropModule],
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  isEditMode = false;
  recipeId?: number;
  isFormDirty = false;

  // Dropdown options for units
  units: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private lookupService: LookupService
  ) {
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

    this.lookupService.getUnits().subscribe((units) => {
      this.units = units;
    });
  }

  ngOnInit(): void {
    // Check route parameters to see if we are editing an existing recipe
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.isEditMode = true;
        this.recipeId = +params['id'];
        this.loadRecipe(this.recipeId);
      } else {
        // Initialize with one empty row for new recipes
        this.addInstruction();
        this.addIngredient();
      }
    });

    // Track form changes after initial load
    this.recipeForm.valueChanges.subscribe(() => {
      this.isFormDirty = true;
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

  // --- Drag and Drop ---
  dropInstruction(event: CdkDragDrop<string[]>): void {
    const instructionControls = this.instructions.controls;
    moveItemInArray(instructionControls, event.previousIndex, event.currentIndex);
    this.instructions.setValue(instructionControls.map(c => c.value));
    this.isFormDirty = true;
  }

  dropIngredient(event: CdkDragDrop<FormGroup[]>): void {
    const ingredientControls = this.ingredients.controls;
    moveItemInArray(ingredientControls, event.previousIndex, event.currentIndex);
    this.ingredients.setValue(ingredientControls.map(c => c.value));
    this.isFormDirty = true;
  }

  // --- Load Recipe for Edit Mode ---
  private loadRecipe(id: number): void {
    this.recipeService.getRecipeById(id).subscribe((recipe: Recipe) => {
      this.recipeForm.patchValue({
        name: recipe.name,
        servings: recipe.servings,
        mealType: recipe.mealType,
        fullMeal: recipe.fullMeal,
        timeToCook: recipe.timeToCook,
        comments: recipe.comments || '',
        source: recipe.source || '',
        tried: recipe.tried,
      });

      // Clear and repopulate instructions
      this.instructions.clear();
      recipe.instructions.forEach((inst) => this.addInstruction(inst));

      // Clear and repopulate ingredients
      this.ingredients.clear();
      recipe.ingredients.forEach((ing) => this.addIngredient(ing));

      // Reset dirty flag after loading
      this.isFormDirty = false;
    });
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

    if (this.isEditMode && this.recipeId) {
      this.recipeService.updateRecipe(this.recipeId, recipe).subscribe({
        next: (response) => {
          console.log('Backend response from updating recipe: ', response);
          this.router.navigate(['/recipe', response.name]);
        },
        error: (err) => {
          console.error('Error updating recipe:', err);
        }
      });
    } else {
      this.recipeService.createRecipe(recipe).subscribe({
        next: (response) => {
          console.log('Backend response from creating recipe: ', response);
          this.router.navigate(['/recipes']);
        },
        error: (err) => {
          console.error('Error creating recipe:', err);
        }
      });
    }
  }

  // --- Check if save should be disabled ---
  get isSaveDisabled(): boolean {
    if (this.isEditMode) {
      return this.recipeForm.invalid || !this.isFormDirty;
    }
    return this.recipeForm.invalid;
  }
}
