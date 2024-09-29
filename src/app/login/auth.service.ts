import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/*   private apiUrl = 'https://sysoutbackend.herokuapp.com';
 */  private apiUrl = environment.apiUrl;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, senha: string) {
    return this.http.post<any>(`${this.apiUrl}/login`, { login, senha });
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/'])
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  getIsAdmin() {
    return localStorage.getItem('administrador');
  }

  setIsAdmin(administrador: string) {
    return localStorage.setItem('administrador', administrador);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setNome(username: string) {
    localStorage.setItem('username', username);
  }

  getNome() {
    return localStorage.getItem('username');
  }

  setIdEmpresa(idEmpresa: string) {
    localStorage.setItem('idEmpresa', idEmpresa);
  }

  getIdEmpresa() {
    return localStorage.getItem('idEmpresa');
  }

  setId(id: string) {
    localStorage.setItem('id', id);
  }

  getId() {
    return localStorage.getItem('id');
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }
}
