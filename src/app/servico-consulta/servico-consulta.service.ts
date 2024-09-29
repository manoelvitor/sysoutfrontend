import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Servico } from './servico-model';
import { AuthService } from '../login/auth.service';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServicoConsultaService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl = environment.apiUrl;
  
  consultarServicos(idEmpresa: any) {
    return this.http.get<Servico[]>(`${this.apiUrl}/servicos/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Servico[]>(`${this.apiUrl}/servicos/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(servico: Servico) {
    return this.http.put<Servico[]>(`${this.apiUrl}/servicos`,servico);
  }

  adicionar(servico: Servico) {
    return this.http.post<Servico[]>(`${this.apiUrl}/servicos`,servico);
  }

  excluir(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<Servico[]>(`${this.apiUrl}/servicos/${id}`,{headers});
  }

}
