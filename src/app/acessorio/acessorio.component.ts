import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Acessorio } from '../os/acessorio-model';
import { AcessorioService } from './acessorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acessorio',
  templateUrl: './acessorio.component.html',
  styleUrls: ['./acessorio.component.css']
})
export class AcessorioComponent {

  constructor(private service: AcessorioService, private router: Router) { }
  ngOnInit(): void {
  }

  acessorios: Acessorio[] = [];
  acessorio: Acessorio = new Acessorio;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar:boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');



  consultar(idEmpresa: any): void {
    this.service.consultar(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.acessorios = response;
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
          this.acessorios = response;
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
          alert('Serviço deletado com sucesso!')   
          this.router.navigate(['/acessorios']);
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




  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('descricao', { static: false }) descricao: ElementRef | undefined;
  @ViewChild('valor', { static: false }) valor: ElementRef | undefined;

  editar(acessorio: Acessorio, flag: boolean) {
    if(flag){
      this.labelEditar = true
    }
    if(!flag){
      this.labelEditar = false
    }
  
    if (this.id) {
      this.id.nativeElement.value = acessorio.id;
    }
    if (this.nome) {
      this.nome.nativeElement.value = acessorio.nome;
    }
    if (this.descricao) {
      this.descricao.nativeElement.value = acessorio.descricao;
    }
   
    if (this.idEmpresa) {
      this.idEmpresa.nativeElement.value = acessorio.idEmpresa;
    }
    

  }

  salvar(acessorio: Acessorio, editar: boolean): void {
    acessorio.idEmpresa = localStorage.getItem("idEmpresa");
    if (editar) {
      if (this.id) {
        acessorio.id = this.id.nativeElement.value
      }
      if (this.nome) {
        acessorio.nome = this.nome.nativeElement.value
      }
      if (this.descricao) {
        acessorio.descricao = this.descricao.nativeElement.value;
      }
  
      this.service.atualizar(acessorio).subscribe(
        (response) => {
          if (response) {
            alert("Serviço alterado com sucesso!")
            this.router.navigate(['/acessorios']);
            this.consultar(acessorio.idEmpresa);
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
      acessorio.id = null;
      this.service.adicionar(acessorio).subscribe(
        (response) => {
          console.log(acessorio);

          if (response) {
            alert("Produto adicionado com sucesso!")
            this.router.navigate(['/acessorios']);
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
