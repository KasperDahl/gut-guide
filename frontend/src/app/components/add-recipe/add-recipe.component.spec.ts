import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AddRecipeComponent } from './add-recipe.component';

describe('AddRecipeComponent', () => {
  let component: AddRecipeComponent;
  let fixture: ComponentFixture<AddRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddRecipeComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form controls', () => {
    expect(component.recipeForm.contains('name')).toBeTruthy();
    expect(component.recipeForm.contains('instructions')).toBeTruthy();
    expect(component.recipeForm.contains('ingredients')).toBeTruthy();
    expect(component.recipeForm.contains('servings')).toBeTruthy();
    expect(component.recipeForm.contains('mealType')).toBeTruthy();
    expect(component.recipeForm.contains('fullMeal')).toBeTruthy();
    expect(component.recipeForm.contains('tried')).toBeTruthy();
    expect(component.recipeForm.contains('comments')).toBeTruthy();
  });

  it('should add new instruction', () => {
    const initialLength = component.instructions.length;
    component.addInstruction();
    expect(component.instructions.length).toBe(initialLength + 1);
  });

  it('should add new ingredient', () => {
    const initialLength = component.ingredients.length;
    component.addIngredient();
    expect(component.ingredients.length).toBe(initialLength + 1);
  });

  it('should save recipe', () => {
    spyOn(console, 'log');
    component.recipeForm.setValue({
      name: 'Test Recipe',
      instructions: ['Test Instruction'],
      ingredients: [{ name: 'Test Ingredient', quantity: 1, unit: 'g' }],
      servings: 4,
      mealType: 'Hovedret',
      fullMeal: true,
      tried: false,
      comments: 'Test Comments'
    });
    component.saveRecipe();
    expect(console.log).toHaveBeenCalledWith(component.recipeForm.value);
  });

  it('should discard recipe', () => {
    component.recipeForm.setValue({
      name: 'Test Recipe',
      instructions: ['Test Instruction'],
      ingredients: [{ name: 'Test Ingredient', quantity: 1, unit: 'g' }],
      servings: 4,
      mealType: 'Hovedret',
      fullMeal: true,
      tried: false,
      comments: 'Test Comments'
    });
    component.discardRecipe();
    expect(component.recipeForm.value).toEqual({
      name: '',
      instructions: [],
      ingredients: [],
      servings: '',
      mealType: '',
      fullMeal: '',
      tried: '',
      comments: ''
    });
  });
});
