import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  token: string | null = '';
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('jwt_token');
  }

  getEmployees() {
    return this.http.get<any[]>('http://localhost:5000/employees', {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
  createEmployee(employeeData: any) {
    return this.http.post<any>(
      'http://localhost:5000/employees',
      employeeData,
      {
        headers: { Authorization: `Bearer ${this.token}` },
      }
    );
  }
  updateEmployee(id: number, employeeData: any) {
    return this.http.put<any>(
      `http://localhost:5000/employees/${id}`,
      employeeData,
      { headers: { Authorization: `Bearer ${this.token}` } }
    );
  }
  deleteEmployee(id: number) {
    return this.http.delete<any>(`http://localhost:5000/employees/${id}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }
}
