import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = 'https://swiftcontrol.alwaysdata.net/api'; // o localhost si estás en local

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  getUser(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/user`, { headers });
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.baseUrl}/register`, {
      name,
      email,
      password
    });
  }

  getTickets(token: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/tickets`, { headers });
  }

  getTicketByToken(tokenFile: string, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.baseUrl}/media/${tokenFile}`, { headers });
  }




}
