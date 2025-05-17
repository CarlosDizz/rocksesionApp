import { Routes } from '@angular/router';
import { AppShellComponent } from './layout/app-shell/app-shell.component'; // Asegúrate de que esto esté bien importado

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'app',
    component: AppShellComponent, // ← layout con menú lateral
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.page').then((m) => m.HomePage),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },{
        path: 'tickets',
        loadComponent: () => import('./pages/tickets/tickets.page').then(m => m.TicketsPage),
      },
      {
        path: 'tickets/:token/qr',
        loadComponent: () =>
            import('./pages/ticket-qr/ticket-qr.page').then(m => m.TicketQrPage),
      }

    ]
  },
  {
    path: 'tickets',
    loadComponent: () => import('./pages/tickets/tickets.page').then( m => m.TicketsPage)
  },
  {
    path: 'ticket-qr',
    loadComponent: () => import('./pages/ticket-qr/ticket-qr.page').then( m => m.TicketQrPage)
  }
];
