import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EntitiesComponent } from './entities/entities.component';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'entities', component: EntitiesComponent },
  { path: 'employees', component: EmployeesComponent },
];
