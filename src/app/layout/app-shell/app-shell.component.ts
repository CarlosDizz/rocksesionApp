import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  IonMenu,
  IonHeader,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonMenuToggle
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {homeOutline, personOutline, settingsOutline, ticketOutline} from "ionicons/icons";

addIcons({
  'home-outline': homeOutline,
  'person-outline': personOutline,
  'settings-outline': settingsOutline,
  'ticket-outline': ticketOutline,
});

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    RouterModule,
    IonMenu,
    IonHeader,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonRouterOutlet,
    IonMenuToggle,
  ],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],

})
export class AppShellComponent {
  current: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const segments = this.router.url.split('/');
      this.current = segments[segments.length - 1];
    });
  }

  onMenuOpen() {
    document.body.classList.add('menu-open');
  }

  onMenuClose() {
    document.body.classList.remove('menu-open');
  }


}
