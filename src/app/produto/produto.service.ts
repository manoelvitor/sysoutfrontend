import { Injectable } from '@angular/core';
import { Produto } from './produto';
import { AuthService } from '../login/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private http: HttpClient, private auth: AuthService) {}

/*   private apiUrl = 'https://sysoutbackend.herokuapp.com';
 */   private apiUrl = environment.apiUrl;

private headers = new HttpHeaders().set('Authorization', `Bearer ${this.auth.getToken()}`);
  
  consultarProdutos(idEmpresa: any) {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/empresa/${idEmpresa}`);
  }

  consultarPorNome(idEmpresa: any, nome: string) {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/empresa/${idEmpresa}/${nome}`);
  }

  consultarPorNomeECategoria(idEmpresa: any, nome: string, categoria: string) {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/empresa/${idEmpresa}/${nome}/${categoria}`);
  }

  consultarPorCategoria(idEmpresa: any, categoria: string) {
    return this.http.get<Produto[]>(`${this.apiUrl}/produtos/empresa/${idEmpresa}/categoria/${categoria}`);
  }

  atualizar(produto: Produto) {
    return this.http.put<Produto>(`${this.apiUrl}/produtos`,produto, {headers: this.headers});
  }

  adicionar(produto: Produto) {
    
    return this.http.post<Produto[]>(`${this.apiUrl}/produtos`, produto,{headers: this.headers});
  }

  excluir(id: any) {
    return this.http.delete<Produto[]>(`${this.apiUrl}/produtos/${id}`,{headers: this.headers});
  }
}
