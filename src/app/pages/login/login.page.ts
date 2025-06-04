import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonInput,
  IonButton,
  IonFooter
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonContent,
    IonInput,
    IonButton,
    IonFooter
  ],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  async login() {
    this.api.login(this.email, this.password).subscribe({
      next: async (res: any) => {
        await Preferences.set({
          key: 'auth_token',
          value: res.token,
        });
        this.router.navigateByUrl('/app/home');
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
