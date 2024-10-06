import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    const loginData = {
      username: this.username,
      password: this.password,
    };
    this.loginService.login(this.username, this.password).subscribe({
      next: (data: any) => {
        console.log(data);

        localStorage.setItem('jwt_token', data.access_token);
        this.router.navigate(['/entities']);
      },
      error: (error) => {
        alert('Credenciales inválidas');
      },
    });
  }
}
