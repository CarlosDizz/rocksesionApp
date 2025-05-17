import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preferences } from '@capacitor/preferences';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-ticket-qr',
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    RouterModule,
    IonBackButton,
    CommonModule
  ],
  templateUrl: './ticket-qr.page.html',
  styleUrls: ['./ticket-qr.page.scss']
})
export class TicketQrPage implements OnInit {
  qrImageUrl: any = null;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const tokenParam = this.route.snapshot.paramMap.get('token');
    if (!tokenParam) {
      this.error = true;
      return;
    }

    try {
      const { value: token } = await Preferences.get({ key: 'auth_token' });
      if (!token) throw new Error('No auth token');

      const qrUrl = `${this.api.baseUrl}/media/${tokenParam}`;
      const headers = new HttpHeaders({
        Authorization: `Bearer ${token}`
      });

      this.http.get(qrUrl, { headers, responseType: 'blob' }).subscribe({
        next: (blob) => {
          this.qrImageUrl = this.sanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(blob)
          );
        },
        error: () => {
          console.error('❌ No se pudo cargar el QR');
          this.error = true;
        }
      });
    } catch (err) {
      this.error = true;
    }
  }
}
