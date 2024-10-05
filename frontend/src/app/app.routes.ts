import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { AboutComponent } from './components/about/about.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: 'recipe/:name', component: RecipeDetailsComponent },
    { path: 'about', component: AboutComponent },
    { path: 'add-recipe', component: AddRecipeComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home on empty path
];
