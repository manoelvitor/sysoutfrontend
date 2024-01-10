import { Component, ElementRef, ViewChild } from '@angular/core';
import { Situacao } from '../os/situacao-model';
import { SituacaoService } from './situacao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-situacao',
  templateUrl: './situacao.component.html',
  styleUrls: ['./situacao.component.css']
})
export class SituacaoComponent {
  constructor(private service: SituacaoService, private router: Router) { }
  ngOnInit(): void {
  }

  situacoes: Situacao[] = [];
  situacao: Situacao = new Situacao;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar:boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');



  consultar(idEmpresa: any): void {
    this.service.consultar(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.situacoes = response;
        }


      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  consultarPorNome(idEmpresa: any, nome: string): void {
    this.service.consultarPorNome(idEmpresa, nome).subscribe(
      (response) => {
        if (response) {
          this.situacoes = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  excluir(id:any): void {
    this.service.excluir(id).subscribe(
      (response) => {
        if (response) {
          alert('Situacão deletado com sucesso!')   
          this.router.navigate(['/situacoes']);
          this.consultar(this.idEmpresaGlobal);
          console.log('id '+ this.idEmpresaGlobal)
    
        }
      }
      ,
      (error) => {
        console.log(error);
        alert('Situacao deletado com sucesso!')   

      }
    );
  }




  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('descricao', { static: false }) descricao: ElementRef | undefined;

  editar(situacao: Situacao, flag: boolean) {
    if(flag){
      this.labelEditar = true
    }
    if(!flag){
      this.labelEditar = false
    }
  
    if (this.id) {
      this.id.nativeElement.value = situacao.id;
    }
    if (this.nome) {
      this.nome.nativeElement.value = situacao.nome;
    }
    if (this.descricao) {
      this.descricao.nativeElement.value = situacao.descricao;
    }
   
    if (this.idEmpresa) {
      this.idEmpresa.nativeElement.value = situacao.idEmpresa;
    }
    

  }

  salvar(situacao: Situacao, editar: boolean): void {
    situacao.idEmpresa = localStorage.getItem("idEmpresa");
    if (editar) {
      if (this.id) {
        situacao.id = this.id.nativeElement.value
      }
      if (this.nome) {
        situacao.nome = this.nome.nativeElement.value
      }
      if (this.descricao) {
        situacao.descricao = this.descricao.nativeElement.value;
      }
  
      this.service.atualizar(situacao).subscribe(
        (response) => {
          if (response) {
            alert("Serviço alterado com sucesso!")
            this.router.navigate(['/situacoes']);
            this.consultar(situacao.idEmpresa);
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
      situacao.id = null;
      this.service.adicionar(situacao).subscribe(
        (response) => {
          console.log(situacao);

          if (response) {
            alert("Produto adicionado com sucesso!")
            this.router.navigate(['/situacoes']);
            this.consultar(this.idEmpresaGlobal);
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
