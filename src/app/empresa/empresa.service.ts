import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) {}
/*   private apiUrl = 'http://localhost:8080';
 */

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  
  cadastrarEmpresa(empresa: Empresa) {
    return this.http.post<any>(`${this.apiUrl}/InformacoesEmpresas`, empresa);
  }


}
