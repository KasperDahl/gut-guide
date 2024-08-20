import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'gut-guide';
  message: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
      this.apiService.getHello().subscribe((data: string) => {
          this.message = data;
      });
  }
}
