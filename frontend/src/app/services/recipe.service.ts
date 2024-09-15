import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  //   private recipesUrl = 'assets/recipes.json';
  private recipesUrl = 'assets/allRecipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(
      map((recipes) =>
        recipes.map((recipe) => ({
          name: recipe.name,
          mealType: recipe.mealType,
          timeToCook: recipe.timeToCook,
        })),
      ),
    );
  }
}
