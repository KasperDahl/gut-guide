import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { RecipesComponent } from '../recipes/recipes.component';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [
        RouterModule,
        MatIconModule,
        RecipesComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
