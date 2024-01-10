import { Component } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { OsDetalhesService } from '../os-detalhes/os-detalhes.service';
import { Empresa } from '../model/empresa';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  nome:any = '';
  isAdmin:boolean = false;
  logado = localStorage.getItem('token') != null;
  expande = true;

  mostrarMenu: boolean = false;
  constructor(
    private authService: AuthService,
    private osDetalheService: OsDetalhesService,
    ){}
  
  ngOnInit(){
    this.nome = this.authService.getNome();
    this.isAdmin = this.authService.getIsAdmin() === 'true';
    this.consultarEmpresa();
  }
  empresa: Empresa = new Empresa;


  logout(){
    this.authService.logout();
  }

  consultarEmpresa() {
    this.osDetalheService.consultaEmpresa().subscribe(
      (response) => {
        if (response) {
          this.empresa = response[0];
          
       
        }
      }
      ,
      (error) => {
        console.log(error);
      });


  }

 click  = 0
  expandeParam(){

   this.expande = !this.expande ;

  

   

  
}

}
