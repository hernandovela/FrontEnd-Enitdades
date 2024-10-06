import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EntitiesService {
  token: string | null = '';
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('jwt_token');
  }

  getEntities() {
    return this.http.get<any[]>('http://localhost:5000/entities', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  createEntity(name: string) {
    return this.http.post<any>(
      'http://localhost:5000/entities',
      { name },
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }

  updateEntity(id: number, name: string) {
    return this.http.put<any>(
      `http://localhost:5000/entities/${id}`,
      { name },
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }
  deleteEntity(id: number) {
    return this.http.delete<any>(`http://localhost:5000/entities/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
