import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from '../os/os-model';
import { InfoTec } from '../os/infoTec-model';
import { OsDetalhesService } from './os-detalhes.service';
import { TipoMemoriaRam } from './tipoMemoriaRam';
import { Situacao } from '../os/situacao-model';
import { Historico } from '../os/historico-model';
import { jsPDF } from "jspdf";
import { Tecnico } from '../tecnico-consulta/tecnico-model';
import { OsConsultaService } from '../os-consulta/os-consulta.service';







@Component({
  selector: 'app-os-detalhes',
  templateUrl: './os-detalhes.component.html',
  styleUrls: ['./os-detalhes.component.css']
})
export class OsDetalhesComponent {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private osDetalheService: OsDetalhesService,
    private osConsultaService: OsConsultaService,

  ) { }

  ordemServico: OrdemServico = new OrdemServico;
  infoTec: InfoTec = new InfoTec;
  situacoes: Situacao[] = [];
  historico: Historico = new Historico;
  historicos: Historico[] = [];

  tecnicos: Tecnico[] = [];
  @ViewChild('modalTransferir', { static: false }) modalTransferir: ElementRef | undefined;



  closeModal(): void {
    if (this.modalTransferir) {
      this.modalTransferir.nativeElement.querySelector('.close').click();
    }
  }



gerarPDF() {

  const doc = new jsPDF();

  doc.text("Hello world!", 10, 10);
  ("a4.pdf");
}




enumValues(): string[] {
  return Object.values(TipoMemoriaRam);
}

setHdFalse() {
  this.ordemServico.infoTec.hardDisk = false
}
setHdTrue() {
  this.ordemServico.infoTec.hardDisk = true
}

setSsdFalse() {
  this.ordemServico.infoTec.ssd = false
}
setSsdTrue() {
  this.ordemServico.infoTec.ssd = true
}

tiposMemoria = ['DDR1', 'DDR2', 'DDR3', 'DDR4', 'DDR5']
id:any;

/* this.router.navigate(['/os-detalhes'],{ queryParams: { id: JSON.stringify(id) }, queryParamsHandling: null})
 */

ngOnInit() {
  this.activateRoute.queryParams.subscribe(params => {
    this.id = JSON.parse(params['id']);
    this.consultaOsId(this.id );
  });
  if (this.ordemServico.infoTec == null) {
    this.ordemServico.infoTec = this.infoTec;
    this.ordemServico.infoTec.tpMemoriaRam;
  }
  this.consultarSituacoes(localStorage.getItem('idEmpresa'));
  this.consultarTecnicos(localStorage.getItem('idEmpresa'));
  this.historicos = this.ordemServico.historico;
}


atualizaInfoTec() {
  this.ordemServico.infoTec.idEmpresa = localStorage.getItem('idEmpresa');
  this.osDetalheService.atualizarInfoTec(this.ordemServico.id, this.ordemServico.infoTec).subscribe(
    (response) => {
      if (response) {
        alert("Informações adicionada com sucesso!")
        console.log(response);
      }

    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

transfereOs() {
  this.osDetalheService.transfereOS(this.ordemServico.id, this.ordemServico.tecnicoResponsavel.id).subscribe(
    (response) => {
      if (response) {

        this.closeModal();
        this.router.navigate(['/os-consultar'])

        alert("Ordem de serviço transferida com sucesso!")

        console.log(response);

      }
    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

atualizaHistorico() {
  this.osDetalheService.atualizarHistorico(this.ordemServico.id, this.historico).subscribe(
    (response) => {
      if (response) {
        alert("Histórico atualizado com sucesso!")
        console.log(response)
        this.consultaOsId(this.ordemServico.id);

        
 
        
        
      }
    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

consultarSituacoes(idEmpresa: any): void {
  this.osDetalheService.consultarSituacoes(idEmpresa).subscribe(
    (response) => {
      if (response) {
        this.situacoes = response
      }
      //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

consultarTecnicos(idEmpresa: any): void {
  this.osDetalheService.consultarTecnicos(idEmpresa).subscribe(
    (response) => {
      if (response) {
        this.tecnicos = response;
        console.log(response)
      }
      //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

detalhes(ordemServico: OrdemServico) :void {
  this.router.navigate(['/os-detalhes'],{ queryParams: { ordemServico: JSON.stringify(ordemServico) }, queryParamsHandling: null})
  console.log('ola')
}


consultaOsId(idOs: any): void {
  this.osDetalheService.consultaOSPorId(idOs).subscribe(
    (response) => {
      if (response) {
        this.ordemServico = response;
        this.historicos = this.ordemServico.historico;
        console.log(response)
      }
      //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
    }
    ,
    (error) => {
      console.log(error);
    }
  );
}

adicionarServico(id: any) :void {
  this.router.navigate(['/servico-adicionar'],{ queryParams: { id: JSON.stringify(id) }, queryParamsHandling: null})
}


}
