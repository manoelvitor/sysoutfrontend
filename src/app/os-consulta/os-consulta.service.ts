import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemServico } from '../os/os-model';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class OsConsultaService {


private apiUrl = environment.apiUrl;


 headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  constructor(private http: HttpClient) { }
  consultar(idEmpresa: any) {
    return this.http.get<OrdemServico[]>(`${this.apiUrl}/os/empresa/${idEmpresa}`);
  }

  consultarOsPorIdTecnico(idTecnico: any) {
    return this.http.get<OrdemServico[]>(`${this.apiUrl}/os/tecnico/${idTecnico}`,{headers: this.headers});
  }


  consultarOsPorId(idOs: any) {
    return this.http.get<OrdemServico[]>(`${this.apiUrl}/os/${idOs}`,{headers: this.headers});
  }


  gerarNrOs(id:any) {
    return this.http.put<any>(`${this.apiUrl}/os/geranros/${id}`,{headers: this.headers});
  }

  consultarNomeCliente(idEmpresa: any, nome: any) {
    return this.http.get<OrdemServico[]>(`${this.apiUrl}/os/empresa/${idEmpresa}/cliente/nome/${nome}`,{headers: this.headers});
  }

  
  consultarNrOs(nr: any) {
    return this.http.get<OrdemServico>(`${this.apiUrl}/os/numero/${nr}`,{headers: this.headers});
  }
  consultarStatus() {
    return this.http.get<any[]>(`${this.apiUrl}/os/status`,{headers: this.headers});
  }

  consultarOsPorCategoria() {
    return this.http.get<any[]>(`${this.apiUrl}/os/status`,{headers: this.headers});
  }
  consultarOsPorStatus (idEmpresa: any, status:any ) {
    return this.http.get<any[]>(`${this.apiUrl}/os/empresa/${idEmpresa}/status/${status}`,{headers: this.headers});
  }
  
  

}
