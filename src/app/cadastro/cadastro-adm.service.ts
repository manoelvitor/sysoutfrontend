import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { cadastroUsuario } from '../model/cadastroUsuario';

@Injectable({
  providedIn: 'root'
})
export class CadastroAdmService {

  constructor(private http: HttpClient) {}

/*   private apiUrl = 'http://localhost:8080';
 */
  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  cadastrarUsuario(usuario: cadastroUsuario) {
    return this.http.post<any>(`${this.apiUrl}/usuarios/adm`, usuario);
  }

  atribuiEmpresa(usuario: cadastroUsuario, idEmpresa: any) {
    return this.http.put<any>(`${this.apiUrl}/usuarios/atualiza/empresa/ ${usuario.id} / ${idEmpresa}`,usuario);
  }

}
