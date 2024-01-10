import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClienteConsultaService } from './cliente-consulta.service';
import { Router } from '@angular/router';
import { Cliente } from './cliente-model';
import { ModalDirective } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-cliente-consulta',
  templateUrl: './cliente-consulta.component.html',
  styleUrls: ['./cliente-consulta.component.css']
})
export class ClienteConsultaComponent {
  constructor(private service: ClienteConsultaService, private router: Router) { }
  ngOnInit(): void {
    this.consultar(this.idEmpresaGlobal)
  }

  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar: boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');
  telefoneMask = '(99) 9999-9999';

  formatarTelefone(telefone: string): string {
    const ddd = telefone.substring(0, 2);
    const parte1 = telefone.length == 10 ? telefone.substring(2, 6) : telefone.substring(2, 7);
    const parte2 = telefone.length == 10 ? telefone.substring(6, 10) : telefone.substring(7, 11);
    return `(${ddd}) ${parte1}-${parte2}`;
  }


  consultar(idEmpresa: any): void {
    this.service.consultarServicos(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.clientes = response;
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
          this.clientes = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }
  excluidoSucesso: boolean = false;

  excluir(id: any): void {
    this.service.excluir(id).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          console.log('id  empresa ' + this.idEmpresaGlobal)
          this.excluidoSucesso = true;
          this.closeModal()
        }
      }
      ,
      (error) => {
        this.excluidoSucesso = false;
        this.closeModal()
        console.log(error);
      }

    );
  }

  fecharModalExcluirSucesso(): void {
    this.excluidoSucesso = false;
  }

  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('endereco', { static: false }) endereco: ElementRef | undefined;
  @ViewChild('cnpj', { static: false }) cnpj: ElementRef | undefined;
  @ViewChild('cpf', { static: false }) cpf: ElementRef | undefined;
  @ViewChild('rg', { static: false }) rg: ElementRef | undefined;
  @ViewChild('telefone', { static: false }) telefone: ElementRef | undefined;
  @ViewChild('email', { static: false }) email: ElementRef | undefined;
  @ViewChild('modalConfirmaExc', { static: false }) modalConfirmaExc: ElementRef | undefined;
  @ViewChild('modalEditar', { static: false }) modalEditar: ElementRef | undefined;


  closeModal(): void {
    if (this.modalConfirmaExc) {
      if (this.modalEditar) {
        this.modalEditar.nativeElement.querySelector('.close').click();
        this.consultar(this.idEmpresaGlobal);
      }
    }
  }

  desabilitaCampos(habilita: boolean) {
    if (this.nome) {
      this.nome.nativeElement.disabled = habilita;
      this.nome.nativeElement.focus();

    }
    if (this.endereco) {
      this.endereco.nativeElement.disabled = habilita;
    }
    if (this.cnpj) {
      this.cnpj.nativeElement.disabled = habilita;
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


  editar(cliente: Cliente, flag: boolean) {
    this.desabilitaCampos(flag);
    if (flag) {
      this.labelEditar = true
      if (this.id) {
        this.id.nativeElement.value = cliente.id;
      }
      if (this.nome) {
        this.nome.nativeElement.value = cliente.nome;
      }
      if (this.endereco) {
        this.endereco.nativeElement.value = cliente.endereco;
      }
      if (this.cnpj) {
        this.cnpj.nativeElement.value = cliente.cnpj;
      }
      if (this.cpf) {
        this.cpf.nativeElement.value = cliente.cpf;
      }
      if (this.rg) {
        this.rg.nativeElement.value = cliente.rg;
      }
      if (this.telefone) {
        this.telefone.nativeElement.value = cliente.telefone;
      }
      if (this.email) {
        this.email.nativeElement.value = cliente.email;
      }
    }
    if (!flag) {
      this.labelEditar = false
      if (this.id) {
        this.id.nativeElement.value = null;
      }
      if (this.nome) {
        this.nome.nativeElement.focus();
        this.nome.nativeElement.value = null;

      }
      if (this.endereco) {
        this.endereco.nativeElement.value = null;
      }
      if (this.cnpj) {
        this.cnpj.nativeElement.value = null;
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

  salvar(cliente: Cliente, editar: boolean): void {
    cliente.idEmpresa = this.idEmpresaGlobal;
    if (editar) {
      if (this.id) {
        cliente.id = this.id.nativeElement.value
      }
      if (this.nome) {
        cliente.nome = this.nome.nativeElement.value
      }
      if (this.endereco) {
        cliente.endereco = this.endereco.nativeElement.value
      }
      if (this.cnpj) {
        cliente.cnpj = this.cnpj.nativeElement.value
      }
      if (this.cpf) {
        cliente.cpf = this.cpf.nativeElement.value
      }
      if (this.rg) {
        cliente.rg = this.rg.nativeElement.value
      }
      if (this.telefone) {
        cliente.telefone = this.telefone.nativeElement.value
      }
      if (this.email) {
        cliente.email = this.email.nativeElement.value
      }


      this.service.atualizar(cliente).subscribe(
        (response) => {
          if (response) {
            alert("Cliente alterado com sucesso!")
            this.router.navigate(['/cliente-consultar']);
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
    if (!editar) {
      cliente.id = null;
      this.service.adicionar(cliente).subscribe(
        (response) => {
          console.log(response);


          if (response) {
            this.router.navigate(['/cliente-consultar']);
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
