import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonicModule]
})
export class AppComponent {
  constructor(private router: Router) {
    this.checkLogin();
  }

  async checkLogin() {
    const { value: token } = await Preferences.get({ key: 'auth_token' });

    const currentPath = window.location.pathname;
    console.log(currentPath);

    const isPublicRoute = ['/login', '/register'].includes(currentPath);

    if (!token && !isPublicRoute) {
      this.router.navigateByUrl('/login');
    }

    if (token && currentPath === '/login') {
      this.router.navigateByUrl('/tabs');
    }
  }

}
