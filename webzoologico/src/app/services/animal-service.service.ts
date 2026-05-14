import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  apiUri = '/api/animals';
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) {}

  getAllAnimalsData(): Observable<any> {
    return this.http.get<any>(this.apiUri);
  }

  getAnimalById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUri}/${id}`);
  }

  createAnimal(animal: any): Observable<any> {
    return this.http.post<any>(this.apiUri, animal, { headers: this.httpOptions });
  }

  updateAnimal(id: string, animal: any): Observable<any> {
    return this.http.put<any>(`${this.apiUri}/${id}`, animal, { headers: this.httpOptions });
  }

  deleteAnimal(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUri}/${id}`);
  }
}
