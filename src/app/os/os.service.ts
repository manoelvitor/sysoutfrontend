import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from './categoria-model';
import { Acessorio } from './acessorio-model';
import { OrdemServico } from './os-model';

@Injectable({
  providedIn: 'root'
})
export class OsService {

  constructor(private http: HttpClient) {}
  
  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
/*   private apiUrl = 'http://localhost:8080';
 */

  consultarCategoria(idEmpresa: any) {
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias/empresa/${idEmpresa}`);
  }
  consultarAcessorio(idEmpresa: any) {
    return this.http.get<Acessorio[]>(`${this.apiUrl}/acessorios/empresa/${idEmpresa}`);
  }

  cadastrar(ordemServico: OrdemServico) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
    return this.http.post<OrdemServico>(`${this.apiUrl}/os`,ordemServico,{headers});
  }

  status() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get<string[]>(`${this.apiUrl}/os/status`,{headers: headers});
  }

  gerarNrOs(id:any) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<string>(`${this.apiUrl}/os/geranros/${id}`,{headers: headers});
  }
  


}
