import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ApiService} from "../../services/api.service";
import {IonicModule} from "@ionic/angular";
import {FormsModule} from "@angular/forms";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class LoginPage {
  email = '';
  password = '';

  constructor(private api: ApiService, private router: Router) {}

  login() {
    this.api.login(this.email, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigateByUrl('/tabs');
      },
      error: () => {
        alert('Credenciales incorrectas');
      }
    });
  }
}
