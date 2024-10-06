import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EntitiesService } from '../services/entities.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  employees: any[] = [];
  entities: any[] = [];
  newEmployee = { name: '', role: '', entity_id: null };
  selectedEmployee: any = null;
  constructor(
    private employeesService: EmployeesService,
    private entitiesService: EntitiesService
  ) {}
  ngOnInit(): void {
    this.getEntities();
    this.getEmployees();
  }
  getEntities() {
    this.entitiesService.getEntities().subscribe({
      next: (data) => {
        this.entities = data;
      },
    });
  }
  getEmployees(): void {
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: () => {
        alert('Error al obtener los empleados');
      },
    });
  }
  createEmployee(): void {
    const employeeData = {
      name: this.newEmployee.name,
      role: this.newEmployee.role,
      entity_id: Number(this.newEmployee.entity_id),
    };

    this.employeesService.createEmployee(employeeData).subscribe({
      next: (data) => {
        alert('Empleado creado con éxito');
        this.newEmployee = { name: '', role: '', entity_id: null };
        this.getEmployees(); // Actualizar lista
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 403) {
          alert(e.error.msg);
          return;
        }
        if (e.status == 401) {
          alert(e.error.msg);
          return;
        }
        alert('Error al crear el empleado');
      },
    });
  }
  selectEmployee(employee: any): void {
    this.selectedEmployee = { ...employee };
  }
  updateEmployee(): void {
    if (!this.selectedEmployee) return;

    const employeeData = {
      name: this.selectedEmployee.name,
      role: this.selectedEmployee.role,
      entity_id: this.selectedEmployee.entity_id,
    };
    this.employeesService
      .updateEmployee(this.selectedEmployee.id, employeeData)
      .subscribe({
        next: () => {
          alert('Empleado actualizado con éxito');
          this.selectedEmployee = null;
          this.getEmployees(); // Actualizar lista
        },
        error: (e: HttpErrorResponse) => {
          if (e.status == 403) {
            alert(e.error.msg);
            return;
          }
          if (e.status == 401) {
            alert(e.error.msg);
            return;
          }
          alert('Error al actualizar el empleado');
        },
      });
  }
  deleteEmployee(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este empleado?')) return;
    this.employeesService.deleteEmployee(id).subscribe({
      next: () => {
        alert('Empleado eliminado con éxito');
        this.getEmployees(); // Actualizar lista
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 403) {
          alert(e.error.msg);
          return;
        }
        if (e.status == 401) {
          alert(e.error.msg);
          return;
        }
        alert('Error al eliminar el empleado');
      },
    });
  }

  // Cancelar la edición del empleado
  cancelEdit(): void {
    this.selectedEmployee = null;
  }
}
