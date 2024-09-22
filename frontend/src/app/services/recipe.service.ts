import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  //   private recipesUrl = 'assets/recipes.json';
  private recipesUrl = 'assets/allRecipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getRecipeByName(name: string): Observable<Recipe> {
    return this.getRecipes().pipe(
      map(recipes => {
        const foundRecipe = recipes.find(recipe => recipe.name === name);
        if (!foundRecipe) {
          throw new Error(`Recipe with name ${name} not found`);
        }
        return foundRecipe;
      })
    );
  }
  
}
