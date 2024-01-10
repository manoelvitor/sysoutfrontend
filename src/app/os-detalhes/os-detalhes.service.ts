import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrdemServico } from '../os/os-model';
import { InfoTec } from '../os/infoTec-model';
import { Situacao } from '../os/situacao-model';
import { Historico } from '../os/historico-model';
import { Tecnico } from '../tecnico-consulta/tecnico-model';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class OsDetalhesService {
  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);

  private apiUrl = 'https://sysoutbackend.herokuapp.com';
/*    private apiUrl = 'http://localhost:8080';
 */ 

  constructor(private http: HttpClient) { }

 
  
  atualizarInfoTec(id:any,info:InfoTec) {
    return this.http.put<InfoTec>(`${this.apiUrl}/os/infotec/${id}`,info ,{headers: this.headers});
  }

  atualizarHistorico(id:any,historico:Historico) {
    return this.http.put<Historico[]>(`${this.apiUrl}/os/historico/${id}`, historico,{headers: this.headers});
  }

  transfereOS(id:any,idTecnico:any) {
    return this.http.put<Tecnico>(`${this.apiUrl}/os/transferir/${id}/${idTecnico}`, null,{headers: this.headers});
  }


  consultarTecnicos(idEmpresa: any) {
    return this.http.get<Tecnico[]>(`${this.apiUrl}/usuarios/empresa/${idEmpresa}`, {headers: this.headers});
  }

  consultarSituacoes(idEmpresa: any) {
    return this.http.get<Situacao[]>(`${this.apiUrl}/situacoes/empresa/${idEmpresa}`);
  }

  consultaOSPorId(idOS: any){
    return this.http.get<OrdemServico>(`${this.apiUrl}/os/${idOS}`, {headers: this.headers});
  }

  atualizaGeral(id:any,os:OrdemServico) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`); 
    return this.http.put<OrdemServico[]>(`${this.apiUrl}/os/atualiza/geral/${id}`, os,{headers: headers});
  }

  atualizar(os: OrdemServico) {
    os.tecnicoResponsavel.perfis = [1,2]
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<OrdemServico[]>(`${this.apiUrl}/os`,os, {headers: headers} );
  }

  consultaStatus() {
    return this.http.get<any[]>(`${this.apiUrl}/os/status`, {headers: this.headers});
  }

  adicionaServico(idOs:any, idServ:any) {
    return this.http.put<any[]>(`${this.apiUrl}/os/servico/${idOs}/${idServ}`, {headers: this.headers});
  }

  excluir(idOS: any){
    return this.http.delete<OrdemServico>(`${this.apiUrl}/os/${idOS}`, {headers: this.headers});
  }

  atualizarEmpresa(empresa: Empresa) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<Empresa>(`${this.apiUrl}/InformacoesEmpresas`,empresa, {headers: headers} );
  }

  consultaEmpresa() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    
    return this.http.get<Empresa[]>(`${this.apiUrl}/InformacoesEmpresas/empresa/${localStorage.getItem('idEmpresa')}`, {headers: headers} );
  }

  
}



