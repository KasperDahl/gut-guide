import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
    selector: 'app-recipes',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule,
    ],
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
    recipes$: Observable<Recipe[]>;

    // Prepared for future filtering/sorting
    searchTerm: string = '';
    selectedMealType: string = '';

    constructor(private recipeService: RecipeService) {
        this.recipes$ = this.recipeService.getRecipes();
    }
}
