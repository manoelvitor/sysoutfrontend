import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Cliente } from './cliente-model';

@Injectable({
  providedIn: 'root'
})
export class ClienteConsultaService {
  
  constructor(private http: HttpClient, private auth: AuthService) {}
  
  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
/*   private apiUrl = 'http://localhost:8080';
 */
  consultarServicos(idEmpresa: any) {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Cliente[]>(`${this.apiUrl}/clientes/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(servico: Cliente) {
    return this.http.put<Cliente[]>(`${this.apiUrl}/clientes`,servico);
  }

  adicionar(servico: Cliente) {
    return this.http.post<Cliente[]>(`${this.apiUrl}/clientes`,servico);
  }

  excluir(id: any) {
   const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<Cliente[]>(`${this.apiUrl}/clientes/${id}`,{headers: headers});
  }
}
