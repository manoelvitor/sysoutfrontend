import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tecnico } from '../tecnico-consulta/tecnico-model';

@Injectable({
  providedIn: 'root'
})
export class OsDocumentoService {

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http:HttpClient) { }

  consultarEmpresaId(idEmpresa: any) {
    return this.http.get<Empresa>(`${this.apiUrl}/InformacoesEmpresas/${idEmpresa}`,{headers: this.headers});
  }

  consultarTecnicoId(id: any) {
    return this.http.get<Tecnico>(`${this.apiUrl}/usuarios/${id}`,{headers: this.headers});
  }
}


