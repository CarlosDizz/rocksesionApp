import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonMenuButton
  ]
})
export class HomePage implements OnInit {

  username = '';


  constructor(private http: HttpClient) { }

  async ngOnInit() {
    const { value: token } = await Preferences.get({ key: 'auth_token' });

    if (token) {
      const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

      this.http.get<any>('https://swiftcontrol.alwaysdata.net/api/user', { headers }).subscribe({
        next: (res) => {
          console.log(res);
          this.username = res.name || 'Rockero';
        },
        error: (err) => {
          console.error('Error al obtener usuario:', err);
        }
      });
    }
  }

}
