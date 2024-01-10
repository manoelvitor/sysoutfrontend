import { Component } from '@angular/core';
import { Empresa } from '../model/empresa';
import { OsDetalhesService } from '../os-detalhes/os-detalhes.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-empresa-editar',
  templateUrl: './empresa-editar.component.html',
  styleUrls: ['./empresa-editar.component.css']
})
export class EmpresaEditarComponent {

  empresa: Empresa = new Empresa;




  constructor(
    private router: Router,
    private osDetalheService: OsDetalhesService,

  ) { }

  ngOnInit(): void {
  this.consultarEmpresa(); 

  }


  salvar() {
    this.osDetalheService.atualizarEmpresa(this.empresa).subscribe(
      (response) => {
        if (response) {
          alert('Dados da empresa atualizados!')
          this.consultarEmpresa();
       
        }
      }
      ,
      (error) => {
        console.log(error);
      });
  }

  consultarEmpresa() {
    this.osDetalheService.consultaEmpresa().subscribe(
      (response) => {
        if (response) {
          this.empresa = response[1];
          console.log(response);
          
       
        }
      }
      ,
      (error) => {
        console.log(error);
      });


  }

}
