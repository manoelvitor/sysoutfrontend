import { Component, ElementRef, ViewChild } from '@angular/core';
import { ServicoConsultaService } from './servico-consulta.service';
import { Servico } from './servico-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-servico-consulta',
  templateUrl: './servico-consulta.component.html',
  styleUrls: ['./servico-consulta.component.css']
})
export class ServicoConsultaComponent {

  constructor(private servicoConsultaService: ServicoConsultaService, private router: Router) { }
  ngOnInit(): void {
  }

  servicos: Servico[] = [];
  servico: Servico = new Servico;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar:boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');



  consultarServicos(idEmpresa: any): void {
    this.servicoConsultaService.consultarServicos(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.servicos = response;
        }


        //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  consultarPorNome(idEmpresa: any, nome: string): void {
    this.servicoConsultaService.consultarPorNome(idEmpresa, nome).subscribe(
      (response) => {
        if (response) {
          this.servicos = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  excluir(id:any): void {
    this.servicoConsultaService.excluir(id).subscribe(
      (response) => {
        if (response) {
          alert('Serviço deletado com sucesso!')   
          this.router.navigate(['/servico-consultar']);
          this.consultarServicos(this.idEmpresaGlobal);
          console.log('id '+ this.idEmpresaGlobal)
    
        }
      }
      ,
      (error) => {
        console.log(error);

      }
    );
  }




  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('descricao', { static: false }) descricao: ElementRef | undefined;
  @ViewChild('valor', { static: false }) valor: ElementRef | undefined;

  editar(servico: Servico, flag: boolean) {
    if(flag){
      this.labelEditar = true
    }
    if(!flag){
      this.labelEditar = false
    }
  
    if (this.id) {
      this.id.nativeElement.value = servico.id;
    }
    if (this.nome) {
      this.nome.nativeElement.value = servico.nome;
    }
    if (this.descricao) {
      this.descricao.nativeElement.value = servico.descricao;
    }
    if (this.valor) {
      this.valor.nativeElement.value = servico.valor == undefined ? 0.00 : servico.valor;
    }
    if (this.idEmpresa) {
      this.idEmpresa.nativeElement.value = servico.idEmpresa;
    }
    

  }

  salvar(servico: Servico, editar: boolean): void {
    servico.idEmpresa = localStorage.getItem("idEmpresa");
    if (editar) {
      if (this.id) {
        servico.id = this.id.nativeElement.value
      }
      if (this.nome) {
        servico.nome = this.nome.nativeElement.value
      }
      if (this.descricao) {
        servico.descricao = this.descricao.nativeElement.value;
      }
      if (this.valor) {
        servico.valor = this.valor.nativeElement.value
      }
      this.servicoConsultaService.atualizar(servico).subscribe(
        (response) => {
          if (response) {
            alert("Serviço alterado com sucesso!")
            this.router.navigate(['/servico-consultar']);
            this.consultarServicos(servico.idEmpresa);
            console.log(response);
          }

        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      servico.id = null;
      this.servicoConsultaService.adicionar(servico).subscribe(
        (response) => {
          console.log(servico);

          if (response) {
            alert("Serviço adicionado com sucesso!")
            this.router.navigate(['/servico-consultar']);
            this.consultarServicos(this.idEmpresaGlobal);
            console.log(response);
          }

        }
        ,
        (error) => {
          console.log(error);
        }
      );

    }

  }


  
}

