import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresa } from '../model/empresa';
import { environment } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) {}
  private apiUrl =   environment.apiUrl;
  private urlImg = 'https://api.imgur.com/3/image'
  private CLIENT_ID = 'cacd4395cba5f46';


/*   private apiUrl = 'https://sysoutbackend.herokuapp.com';
 */  
  cadastrarEmpresa(empresa: Empresa) {
    return this.http.post<any>(`${this.apiUrl}/InformacoesEmpresas`, empresa);
  }

  uploadLogo(img: FormData){
    const headers = new HttpHeaders().set('Authorization',  `Client-ID ${this.CLIENT_ID}`);

    return this.http.post<any>(`${this.urlImg}`,img, {headers: headers});
  }


}
