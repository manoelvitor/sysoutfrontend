import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Categoria } from '../os/categoria-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {


  constructor(private http: HttpClient, private auth: AuthService) {}

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
  consultar(idEmpresa: any) {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    console.log(idEmpresa)
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/empresa/${idEmpresa}/${nome}`);
  }

  atualizar(servico: Categoria) {
    return this.http.put<Categoria[]>(`${this.apiUrl}/categorias`,servico);
  }

  adicionar(servico: Categoria) {
    return this.http.post<Categoria[]>(`${this.apiUrl}/categorias`,servico);
  }

  excluir(id: any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.delete<Categoria[]>(`${this.apiUrl}/categorias/${id}`,{headers});
  }

}
