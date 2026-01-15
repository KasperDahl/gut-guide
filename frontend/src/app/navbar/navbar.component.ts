import { Component } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [
        RouterModule,
        RouterLinkActive,
        MatToolbarModule,
        MatButtonModule,
    ],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

}
