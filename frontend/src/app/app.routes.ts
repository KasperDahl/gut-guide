import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipesComponent } from './components/recipes/recipes.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'recipes', component: RecipesComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' } // Redirect to home on empty path
];
