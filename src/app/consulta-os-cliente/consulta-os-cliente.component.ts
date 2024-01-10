import { Component } from '@angular/core';
import { ConsultaOsClienteService } from './consulta-os-cliente.service';
import { OrdemServico } from '../os/os-model';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-consulta-os-cliente',
  templateUrl: './consulta-os-cliente.component.html',
  styleUrls: ['./consulta-os-cliente.component.css']
})
export class ConsultaOsClienteComponent {

  nrOs: any;
  categoriaBuscar: any;
  ordemServico: OrdemServico = new OrdemServico;
  ngOnInit(): void {
  }
  constructor(

    private consultaOsCliente: ConsultaOsClienteService,
    

  ) { }

  dataAtual = new Date();
  data = "";
  printPdf(){
    window.print();

  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
/*     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
 */    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

  }
  
  consultarNrOs() {
    
this.data= this.formatDate(this.dataAtual);
    
    this.ordemServico.nrOrdemServico = null
    this.consultaOsCliente.consultarNrOs(this.nrOs).subscribe(
      (response) => {
        if (response) {
          this.ordemServico = response;

          console.log(response)
        }
      }
      ,
      (error) => {
        alert("Ordem de Serviço não encontrada!")
        console.log(error);
      });


  }







}
