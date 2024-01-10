import { Component, ElementRef, ViewChild } from '@angular/core';
import { TecnicoConsultaService } from './tecnico-consulta.service';
import { Router } from '@angular/router';
import { Tecnico } from './tecnico-model';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-tecnico-consulta',
  templateUrl: './tecnico-consulta.component.html',
  styleUrls: ['./tecnico-consulta.component.css']
})
export class TecnicoConsultaComponent {
  constructor(private service: TecnicoConsultaService, private router: Router) { }
  ngOnInit(): void {
    this.consultar(this.idEmpresaGlobal)
  }

  tecnicos: Tecnico[] = [];
  tecnico: Tecnico = new Tecnico;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar:boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');
  telefoneMask = '(99) 9999-9999';

/*   formatarTelefone(telefone: string): string {
    // Aplicar a lógica de formatação do telefone aqui
    // Por exemplo, formatar para (99) 9999-9999
    // Implemente sua própria lógica de formatação de telefone
    // Aqui está um exemplo básico:
    const ddd = telefone.substring(0, 2);
    const parte1 = telefone.length == 10 ? telefone.substring(2, 6) : telefone.substring(2, 7) ;
    const parte2 = telefone.length == 10 ? telefone.substring(6, 10) : telefone.substring(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  } */


  consultar(idEmpresa: any): void {
    this.service.consultar(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.tecnicos = response;
          this.excluidoSucesso = false;
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
          this.tecnicos = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }
  excluidoSucesso: boolean = false;

  excluir(id:any): void {
    this.service.excluir(id).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          console.log('id  empresa '+ this.idEmpresaGlobal) 
          this.excluidoSucesso = true;
 
        }
        else{
          this.excluidoSucesso = false;


        }
      }
      ,
      (error) => {
    
        console.log(error);
      }
      
    );
  }

  fecharModalExcluirSucesso() : void{
    this.excluidoSucesso = false;
  }

  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('login', { static: false }) login: ElementRef | undefined;
  @ViewChild('administrador', { static: false }) administrador: ElementRef | undefined;
  @ViewChild('cpf', { static: false }) cpf: ElementRef | undefined;
  @ViewChild('rg', { static: false }) rg: ElementRef | undefined;
  @ViewChild('telefone', { static: false }) telefone: ElementRef | undefined;
  @ViewChild('email', { static: false }) email: ElementRef | undefined;
  @ViewChild('modalConfirmaExc', { static: false }) modalConfirmaExc: ElementRef | undefined;
  @ViewChild('modalEditar', { static: false }) modalEditar: ElementRef | undefined;


  closeModal() :void {
    if( this.modalConfirmaExc){
      if(this.modalEditar){
        this.modalEditar.nativeElement.querySelector('.close').click();
        this.consultar(this.idEmpresaGlobal);
      }
    }
  }
  
  desabilitaCampos (habilita: boolean){
    if (this.nome) {
      this.nome.nativeElement.disabled = habilita;
      this.nome.nativeElement.focus();

    }
    if (this.login) {
      this.login.nativeElement.disabled = habilita;
    }
    if (this.administrador) {
      this.administrador.nativeElement.disabled = habilita;
    }    
    if (this.cpf) {
      this.cpf.nativeElement.disabled = habilita;
    }
    if (this.rg) {
      this.rg.nativeElement.disabled = habilita;
    }
    if (this.telefone) {
      this.telefone.nativeElement.disabled = habilita;
    }
    if (this.email) {
      this.email.nativeElement.disabled = habilita;
    }
  }


  editar(tecnico: Tecnico, flag: boolean) {
    this.desabilitaCampos(flag);
    if(flag){
      this.labelEditar = true
      if (this.id) {
        this.id.nativeElement.value = tecnico.id;
      }
      if (this.nome) {
        this.nome.nativeElement.value = tecnico.nome;
      }
      if (this.login) {
        this.login.nativeElement.value = tecnico.login;
      }
      if (this.administrador) {
        this.administrador.nativeElement.value = tecnico.administrador;
      }    
      if (this.cpf) {
        this.cpf.nativeElement.value = tecnico.cpf;
      }
      if (this.rg) {
        this.rg.nativeElement.value = tecnico.rg;
      }
      if (this.telefone) {
        this.telefone.nativeElement.value = tecnico.telefone;
      }
      if (this.email) {
        this.email.nativeElement.value = tecnico.email;
      }
    }
    if(!flag){
      this.labelEditar = false
      if (this.id) {
        this.id.nativeElement.value = null;
      }
      if (this.nome) {
        this.nome.nativeElement.focus();
        this.nome.nativeElement.value = null;

      }
      if (this.login) {
        this.login.nativeElement.value = null;
      }
      if (this.administrador) {
        this.administrador.nativeElement.value = null;
      }    
      if (this.cpf) {
        this.cpf.nativeElement.value = null;
      }
      if (this.rg) {
        this.rg.nativeElement.value = null;
      }
      if (this.telefone) {
        this.telefone.nativeElement.value = null;
      }
      if (this.email) {
        this.email.nativeElement.value = null;
      }

    }
  
   
  }

  salvar(tecnico: Tecnico, editar: boolean): void {
    tecnico.idEmpresa = this.idEmpresaGlobal;
    if (editar) {
      if (this.id) {
        tecnico.id = this.id.nativeElement.value
      }
      if (this.nome) {
        tecnico.nome = this.nome.nativeElement.value
      }
      if (this.login) {
        tecnico.login = this.login.nativeElement.value
      }
      if (this.administrador) {
        tecnico.administrador = this.administrador.nativeElement.value
      }
      if (this.cpf) {
        tecnico.cpf = this.cpf.nativeElement.value
      }
      if (this.rg) {
        tecnico.rg = this.rg.nativeElement.value
      }
      if (this.telefone) {
        tecnico.telefone = this.telefone.nativeElement.value
      }
      if (this.email) {
        tecnico.email = this.email.nativeElement.value
      }
  
  
      this.service.atualizar(tecnico.id, tecnico).subscribe(
        (response) => {
          if (response) {
            this.consultar(this.idEmpresaGlobal);
            alert("Tecnico alterado com sucesso!")
            console.log(response);
          } 

        }
        ,
        (error) => {
          console.log(error);

        }
      );
    }
    if (!editar) {
      tecnico.id = null;
      this.service.adicionar(tecnico).subscribe(
        (response) => {
          console.log(response);


          if (response) {
            this.router.navigate(['/tecnico-consultar']);
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
