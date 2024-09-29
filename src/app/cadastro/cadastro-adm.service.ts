import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cadastroUsuario } from '../model/cadastroUsuario';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CadastroAdmService {

  constructor(private http: HttpClient) {}
  private apiUrl =   environment.apiUrl;

/*   private apiUrl = 'https://sysoutbackend.herokuapp.com';
 */ 
  cadastrarUsuario(usuario: cadastroUsuario) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/adm`, usuario);
  }

  atribuiEmpresa(usuario: cadastroUsuario, idEmpresa: any) {
    return this.http.put<any>(`${this.apiUrl}/usuarios/atualiza/empresa/ ${usuario.id} / ${idEmpresa}`,usuario);
  }



}
