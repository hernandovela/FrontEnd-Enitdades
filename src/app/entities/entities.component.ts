import { Component, OnInit } from '@angular/core';
import { EntitiesService } from '../services/entities.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-entities',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './entities.component.html',
  styleUrl: './entities.component.css',
})
export class EntitiesComponent implements OnInit {
  entities: any[] = [];
  newEntityName: string = '';
  selectedEntity: any = null;
  constructor(private entitiesService: EntitiesService) {}

  ngOnInit(): void {
    this.getEntities();
  }
  getEntities() {
    this.entitiesService.getEntities().subscribe({
      next: (data) => {
        this.entities = data;
      },
      error: () => {
        alert('Error al obtener las entidades');
      },
    });
  }
  createEntity() {
    this.entitiesService.createEntity(this.newEntityName).subscribe({
      next: () => {
        alert('Entidad creada con éxito');
        this.newEntityName = '';
        this.getEntities();
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 403) {
          alert(e.error.msg);
          return;
        }
        alert('Error al crear la entidad');
      },
    });
  }
  selectEntity(entity: any): void {
    this.selectedEntity = { ...entity };
  }
  updateEntity() {
    if (!this.selectedEntity) return;
    this.entitiesService
      .updateEntity(this.selectedEntity.id, this.selectedEntity.name)
      .subscribe({
        next: () => {
          alert('Entidad actualizada con éxito');
          this.selectedEntity = null;
          this.getEntities();
        },
        error: (e: HttpErrorResponse) => {
          if (e.status == 403) {
            alert(e.error.msg);
            return;
          }
          alert('Error al actualizar la entidad');
        },
      });
  }
  deleteEntity(id: number) {
    if (!confirm('¿Estás seguro de eliminar esta entidad?')) return;
    this.entitiesService.deleteEntity(id).subscribe({
      next: () => {
        alert('Entidad eliminada con éxito');
        this.getEntities(); // Actualizar lista
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 403) {
          alert(e.error.msg);
          return;
        }
        alert('Error al eliminar la entidad');
      },
    });
  }
  cancelEdit(): void {
    this.selectedEntity = null;
  }
}
