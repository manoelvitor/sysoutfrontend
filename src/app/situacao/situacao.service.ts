import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Situacao } from '../os/situacao-model';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SituacaoService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
  consultar(idEmpresa: any) {
    return this.http.get<Situacao[]>(`${this.apiUrl}/situacoes/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Situacao[]>(`${this.apiUrl}/situacoes/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(servico: Situacao) {
    return this.http.put<Situacao[]>(`${this.apiUrl}/situacoes`,servico);
  }

  adicionar(servico: Situacao) {
    return this.http.post<Situacao[]>(`${this.apiUrl}/situacoes`,servico);
  }

  excluir(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<Situacao[]>(`${this.apiUrl}/situacoes/${id}`,{headers});
  }

}
