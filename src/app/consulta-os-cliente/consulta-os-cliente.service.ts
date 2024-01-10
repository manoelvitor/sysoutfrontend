import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemServico } from '../os/os-model';

@Injectable({
  providedIn: 'root'
})
export class ConsultaOsClienteService {

  
 
  constructor(private http: HttpClient) { }

  private apiUrl = 'https://sysoutbackend.herokuapp.com';

  /* private apiUrl = 'http://localhost:8080';
   */
  
   headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   

  consultarNrOs(nr: any) {
    return this.http.get<OrdemServico>(`${this.apiUrl}/os/numero/${nr}`);
  }
  
}
