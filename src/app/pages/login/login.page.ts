import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {ApiService} from "../../services/api.service";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";
import { Preferences } from '@capacitor/preferences';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule, RouterModule]
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
        this.router.navigateByUrl('/tabs');
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }

}
