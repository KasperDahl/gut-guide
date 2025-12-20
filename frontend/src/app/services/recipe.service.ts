import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private baseUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient) {}

  // GET all recipes
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.baseUrl);
  }

  // GET recipe by ID
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/${id}`);
  }

  // CREATE new recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(this.baseUrl, recipe);
  }

  getRecipeByName(name: string): Observable<Recipe> {
    return this.getRecipes().pipe(
      map((recipes) => {
        const foundRecipe = recipes.find((recipe) => recipe.name === name);
        if (!foundRecipe) {
          throw new Error(`Recipe with name ${name} not found`);
        }
        return foundRecipe;
      }),
    );
  }
}
