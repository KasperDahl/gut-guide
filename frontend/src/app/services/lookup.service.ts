import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LookupService {

  private baseUrl = `${environment.apiUrl}/api/lookup`;

  constructor(private http: HttpClient) {}

  units: string[] = [
    'hey',
    'yo',
    'g',
    'kg',
    'ml',
    'l',
    'tsp',
    'tbsp',
    'cup',
    'pcs',
    'oz',
    'lb',
  ];

  getUnits(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/units`);
  }
  

  // getUnits(): string[] {
  //   return this.units;
  // }
  
}
