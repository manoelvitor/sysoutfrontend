import { Component } from '@angular/core';
import { OsConsultaService } from './os-consulta.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente-consulta/cliente-model';
import { Servico } from '../servico-consulta/servico-model';
import { Categoria } from '../os/categoria-model';
import { Acessorio } from '../os/acessorio-model';
import { OrdemServico } from '../os/os-model';
import { OsService } from '../os/os.service';

@Component({
  selector: 'app-os-consulta',
  templateUrl: './os-consulta.component.html',
  styleUrls: ['./os-consulta.component.css']
})
export class OsConsultaComponent {

  constructor(private osConsultaOsService: OsConsultaService, private osService: OsService, private router: Router) { }
  ngOnInit(): void {
    this.consultarOs(this.idTecnico);
    this.consultarCategorias();
    this.consultarStatus();

  }
  idEmpresaGlobal = localStorage.getItem("idEmpresa");
  idTecnico = localStorage.getItem("id");

  ordensServico: OrdemServico[] = [];
  clientes: Cliente[] = [];
  servicos: Servico[] = [];
  categorias: Categoria[] = [];
  acessorios: Acessorio[] = [];
  status: string[] = [];

  nomeBuscar = "";
  filtroBusca = 1;
  categoria = "";
  filtroCategoria = ""


  consultarOs(idTecnico: any): void {
    if (localStorage.getItem("token") != null) {
      this.osConsultaOsService.consultarOsPorIdTecnico(idTecnico).subscribe(
        (response) => {
          if (response) {
            this.ordensServico = response
          }
        }
        ,
        (error) => {
          console.log(error);
          this.router.navigate(['/'])
        }
      );
    }
    else {
      this.router.navigate(['/'])

    }
  }
  osEncontrada: OrdemServico[] = [];
  buscaOs(opcao: any) {

    if (this.filtroBusca == 1 && this.nomeBuscar != null && this.nomeBuscar != "") {

      this.osConsultaOsService.consultarNrOs(this.nomeBuscar.valueOf()).subscribe(
        (response) => {
          if (response) {
            this.osEncontrada.push(response);
            this.ordensServico = this.osEncontrada;
            console.log(response)
            console.log(this.filtroBusca)

            console.log()
          }
        }
        ,
        (error) => {
          console.log(error);
          console.log(this.filtroBusca);
        }
      );
    }
    else if (this.filtroBusca == 2 && this.nomeBuscar != null && this.nomeBuscar != "") {
      this.osConsultaOsService.consultarNomeCliente(this.idEmpresaGlobal, this.nomeBuscar).subscribe(
        (response) => {
          if (response) {
            this.ordensServico = response
            console.log(response)
            console.log(this.filtroBusca)


          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      this.osConsultaOsService.consultar(this.idEmpresaGlobal).subscribe(
        (response) => {
          if (response) {
            this.ordensServico = response
            console.log(response)
            console.log(this.filtroBusca)


          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );


    }

  }


  detalhes(id: any): void {
    this.router.navigate(['/os-geral'], { queryParams: { id: JSON.stringify(id) }, queryParamsHandling: null })
  }

  statusOs: any = "";

  consultarCategorias(): void {
    this.osService.consultarCategoria(this.idEmpresaGlobal).subscribe(
      (response) => {
        if (response) {
          this.categorias = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }
  statusFiltro: any[] = [];
  consultarStatus(): void {
    this.osConsultaOsService.consultarStatus().subscribe(
      (response) => {
        if (response) {
          this.statusFiltro = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  consultarOsPorStatus(): void {
    this.osConsultaOsService.consultarOsPorStatus(this.idEmpresaGlobal, this.statusOs).subscribe(
      (response) => {
        if (response) {
          this.ordensServico = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }



}


