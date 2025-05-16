import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [IonicModule, FormsModule, RouterModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  name = '';
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    this.api.register(this.name, this.email, this.password).subscribe({
      next: () => {
        alert('¡Usuario creado! Inicia sesión.');
        this.router.navigateByUrl('/login');
      },
      error: () => {
        alert('Error al registrar. ¿Email ya en uso?');
      }
    });
  }
}
