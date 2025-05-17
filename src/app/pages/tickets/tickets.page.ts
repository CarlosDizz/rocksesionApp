import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';
import {ApiService} from "../../services/api.service";
import {Preferences} from "@capacitor/preferences";
import {RouterLink} from "@angular/router";
import { addIcons } from 'ionicons';
import {
  qrCodeOutline,
  sendOutline
} from 'ionicons/icons';

addIcons({
  'qr-code-outline': qrCodeOutline,
  'send-outline': sendOutline
});


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonIcon,
    RouterLink
  ],
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss']
})
export class TicketsPage implements OnInit {
  tickets: any[] = [];
  usedTickets: any[] = [];
  unusedTickets: any[] = [];
  loading = true;
  error = false;

  constructor(private api: ApiService) {}



  async ngOnInit() {
    const { value: token } = await Preferences.get({ key: 'auth_token' });

    if (!token) {
      this.loading = false;
      this.error = true;
      return;
    }

    this.api.getTickets(token).subscribe({
      next: (res) => {
        this.tickets = res;
        this.usedTickets = res.filter(t => t.checked_in === 1);
        this.unusedTickets = res.filter(t => t.checked_in === 0);
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }


}
