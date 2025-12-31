import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecipeDialog } from '../dialogs/delete-recipe-dialog.component';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule],
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe$!: Observable<Recipe>;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private router: Router    
  ) {}

  ngOnInit() {
    const recipeName = this.route.snapshot.paramMap.get('name');
    if (recipeName) {
      this.recipe$ = this.recipeService.getRecipeByName(recipeName);
    } else {
      console.error('Recipe name is null');
    }
  }

  deleteRecipe(id: number) {
    const dialogRef = this.dialog.open(DeleteRecipeDialog, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.recipeService.deleteRecipe(id).subscribe(() => {
          console.log('Recipe deleted successfully');
          this.router.navigate(['/recipes']);
    
        });
      }
    });
  }
}
