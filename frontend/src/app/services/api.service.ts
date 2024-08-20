import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getHello(): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/hello`, { responseType: 'text' as 'json' });
  }
}
