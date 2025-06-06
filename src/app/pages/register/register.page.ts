import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule, CommonModule],
})
export class RegisterPage {
  /* 2-way bind */
  name = '';
  email = '';
  password = '';
  password2 = '';

  constructor(private api: ApiService, private router: Router) {}

  register() {
    if (this.password !== this.password2) {
      alert('Las contraseñas no coinciden');
      return;
    }

    /* Llama a tu API Laravel → Sanctum */
    this.api.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigateByUrl('/app/home'),
      error: () => alert('No se pudo crear la cuenta'),
    });
  }
}
