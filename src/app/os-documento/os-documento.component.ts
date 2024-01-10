import { Component, ElementRef, ViewChild } from '@angular/core';
import { OrdemServico } from '../os/os-model';
import { ActivatedRoute } from '@angular/router';
import { Empresa } from '../model/empresa';
import { OsDocumentoService } from './os-documento.service';
import jsPDF from 'jspdf';
import { options } from '../app.module';

@Component({
  selector: 'app-os-documento',
  templateUrl: './os-documento.component.html',
  styleUrls: ['./os-documento.component.css']
})
export class OsDocumentoComponent {
  constructor(
    private activateRoute: ActivatedRoute,
    private osDocumentoService: OsDocumentoService
  ){

  }
  @ViewChild('content', {static:false}) el!:ElementRef;



  ordemServico: OrdemServico = new OrdemServico;
  empresa: Empresa = new Empresa;
  data = '';
  hora = '';

  printPdf(){
  window.print();
  }






  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.ordemServico = JSON.parse(params['ordemServico']);
      console.log(this.ordemServico)
    });
    this.consultaEmpresaId(this.ordemServico.idEmpresa);
    this.consultaTecnicoId(localStorage.getItem('id'))
    const [data, hora] = this.ordemServico.dataEntrada.split(" ");
    this.data = data;
    this.hora = hora
  }

  consultaEmpresaId(idEmpresa: any): void {
    this.osDocumentoService.consultarEmpresaId(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.empresa = response
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }


  consultaTecnicoId(id: any): void {
    this.osDocumentoService.consultarTecnicoId(id).subscribe(
      (response) => {
        if (response) {
          this.ordemServico.tecnicoResponsavel = response
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }




}
