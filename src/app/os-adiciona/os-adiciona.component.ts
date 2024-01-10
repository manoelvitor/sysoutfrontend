import { Component, ElementRef, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { ServicoConsultaService } from '../servico-consulta/servico-consulta.service';
import { ClienteConsultaService } from '../cliente-consulta/cliente-consulta.service';
import { OsService } from '../os/os.service';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';
import { Cliente } from '../cliente-consulta/cliente-model';
import { Servico } from '../servico-consulta/servico-model';
import { Categoria } from '../os/categoria-model';
import { Acessorio } from '../os/acessorio-model';
import { OrdemServico } from '../os/os-model';

@Component({
  selector: 'app-os-adiciona',
  templateUrl: './os-adiciona.component.html',
  styleUrls: ['./os-adiciona.component.css']
})
export class OsAdicionaComponent {
  idEmpresaGlobal = localStorage.getItem("idEmpresa");


  constructor(
    private servicoConsultaService: ServicoConsultaService, 
    private clienteConsultaService: ClienteConsultaService, 
    private osService: OsService, 
    private auth: AuthService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router) { }


  ngOnInit(): void {
    this.consultarServicos(this.idEmpresaGlobal);
    this.consultarClientes(this.idEmpresaGlobal);
    this.consultarCategorias(this.idEmpresaGlobal);
    this.consultarAcessorios(this.idEmpresaGlobal);
    this.consultarStatus();
  }

  clientes: Cliente[] = [];
  servicos: Servico[] = [];
  categorias: Categoria[] = [];
  acessorios: Acessorio[] = [];
  status: string[] = [];

  servico: Servico = new Servico;
  cliente: Cliente = new Cliente;
  categoria: Categoria = new Categoria;
  ordemServico: OrdemServico = new OrdemServico;
  ordemServicoConfirma: OrdemServico = new OrdemServico;


  consultarServicos(idEmpresa: any): void {
    this.servicoConsultaService.consultarServicos(idEmpresa).subscribe(
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

  consultarAcessorios(idEmpresa: any): void {
    this.osService.consultarAcessorio(idEmpresa).subscribe(
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

  consultarClientes(idEmpresa: any): void {
    this.clienteConsultaService.consultarServicos(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.clientes = response;
        }


        //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  consultarCategorias(idEmpresa: any): void {
    this.osService.consultarCategoria(idEmpresa).subscribe(
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

  
  consultarStatus(): string[] {
    this.osService.status().subscribe(
      (response) => {
        if (response) {
          this.status = response;
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
    return this.status;
  }

  
  setConfirma(){
    this.ordemServicoConfirma = this.ordemServico;
    this.ordemServicoConfirma.cliente = this.cliente;
    this.ordemServicoConfirma.categoria = this.categoria;
    this.ordemServicoConfirma.tecnicoResponsavel.id = this.auth.getId();
    this.ordemServicoConfirma.idEmpresa = this.auth.getIdEmpresa();
    this.ordemServicoConfirma.acessorios =  this.acessoriosSelecionados;
    this.ordemServicoConfirma.status = this.status[0];
  }

  cadastrar(): void {
    this.ordemServico.cliente = this.cliente;
    this.ordemServico.categoria = this.categoria;
    this.ordemServico.tecnicoResponsavel.id = localStorage.getItem('id');
    this.ordemServico.idEmpresa = this.auth.getIdEmpresa();
    this.ordemServico.acessorios =  this.acessoriosSelecionados;
    this.ordemServico.status =this.status[0];
    this.ordemServico.valorTotal = this.ordemServico.valorOrcamento;
   
    this.osService.cadastrar(this.ordemServico).subscribe(
        (response) => {
          if (response) {
            this.ordemServico = response;
            console.log(this.ordemServico)
/*             this.preencheDocumento(this.ordemServico)
 */
          }
        },
        (error) => {
          console.log(error);
        }
      );

        
   /*  } */

  }

  nomeClienteBuscar:string = '';

  
  consultarPorNomeCliente(idEmpresa: any, nome: string): void {
    this.clienteConsultaService.consultarPorNome(idEmpresa, nome).subscribe(
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


  selecionaCliente(cliente:any){
    this.cliente = cliente;
  }

  
  selecionaCategoria(categoria:any){
    this.categoria = categoria;
  }
  acessoriosSelecionados : Acessorio[] = []; 


  @ViewChildren('checkboxeAcessorios') checkboxeAcessorios: QueryList<ElementRef> | undefined;



  selecionaAcessorios(acessorio:any, i:any){
    var index:number = this.acessoriosSelecionados.indexOf(acessorio);

    const encontrado = this.acessoriosSelecionados.find(elemento => elemento === acessorio);


    if(this.checkboxeAcessorios){
      console.log(i)
       if(this.checkboxeAcessorios.get(i)?.nativeElement.checked){
        if(!encontrado){
          this.acessoriosSelecionados.push(acessorio);

        }

       }
       else{
        if(encontrado){
          this.acessoriosSelecionados.find((elemento,i) => elemento === acessorio ? this.acessoriosSelecionados.splice(i, 1) : '');
        }
       }
      }

              
        }
           
    
 
    preencheDocumento(ordemServico: OrdemServico) :void {
      this.router.navigate(['/os-documento'],{ queryParams: { ordemServico: JSON.stringify(ordemServico) }, queryParamsHandling: null})
  
    }
  

  removerAcessorio(acessorio:any){
    this.acessoriosSelecionados.splice(acessorio,1)
   
  }
}
