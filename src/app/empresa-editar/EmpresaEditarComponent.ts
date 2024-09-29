import { Component } from '@angular/core';
import { Empresa } from './empresa-model';
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
    private osDetalheService: OsDetalhesService

  ) { }

  ngOnInit(): void {
  }


  salvar() {
    alert('Dados da empresa atualizados!');
  }

  consultarEmpresa() {
    this.osDetalheService.consultaEmpresa().subscribe(
      (response) => {
        if (response) {
          this.empresa = response;
        }
      },

      (error) => {
        console.log(error);
      });


  }

}
