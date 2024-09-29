import { Injectable } from '@angular/core';
import { Tecnico } from './tecnico-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class TecnicoConsultaService {
  constructor(private http: HttpClient) { }

   
  private apiUrl = environment.apiUrl;
 
  consultar(idEmpresa: any) {
    return this.http.get<Tecnico[]>(`${this.apiUrl}/usuarios/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Tecnico[]>(`${this.apiUrl}/usuarios/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(id: any, tecnico: Tecnico) {
    return this.http.put<Tecnico[]>(`${this.apiUrl}/usuarios/atualiza/${id} `, tecnico);
  }

  adicionar(tecnico: Tecnico) {
    return this.http.post<Tecnico[]>(`${this.apiUrl}/usuarios`, tecnico);
  }

  excluir(id: any) {
/*     const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
 */    return this.http.delete<Tecnico[]>(`${this.apiUrl}/usuarios/${id}`);
  }
}
