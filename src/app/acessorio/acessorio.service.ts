import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Acessorio } from '../os/acessorio-model';

@Injectable({
  providedIn: 'root'
})
export class AcessorioService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
  consultar(idEmpresa: any) {
    return this.http.get<Acessorio[]>(`${this.apiUrl}/acessorios/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Acessorio[]>(`${this.apiUrl}/acessorios/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(servico: Acessorio) {
    return this.http.put<Acessorio[]>(`${this.apiUrl}/acessorios`,servico);
  }

  adicionar(servico: Acessorio) {
    return this.http.post<Acessorio[]>(`${this.apiUrl}/acessorios`,servico);
  }

  excluir(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<Acessorio[]>(`${this.apiUrl}/acessorios/${id}`,{headers});
  }
}
