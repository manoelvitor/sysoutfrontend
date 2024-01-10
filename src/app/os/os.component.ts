import { Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ServicoConsultaService } from '../servico-consulta/servico-consulta.service';
import { Router } from '@angular/router';
import { Servico } from '../servico-consulta/servico-model';
import { ClienteConsultaService } from '../cliente-consulta/cliente-consulta.service';
import { Cliente } from '../cliente-consulta/cliente-model';
import { OsService } from './os.service';
import { Categoria } from './categoria-model';
import { OrdemServico } from './os-model';
import { AuthService } from '../login/auth.service';
import { Acessorio } from './acessorio-model';
import { CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-os',
  templateUrl: './os.component.html',
  styleUrls: ['./os.component.css']
})
export class OsComponent {

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



  cadastrar(): void {
    this.ordemServico.cliente = this.cliente;
    this.ordemServico.categoria = this.categoria;
    this.ordemServico.tecnicoResponsavel.id = this.auth.getId();
    this.ordemServico.idEmpresa = this.auth.getIdEmpresa();
    this.ordemServico.acessorios =  this.acessoriosSelecionados;
    this.ordemServico.status =this.status[0];
   
/*     if(this.camposPreenchidos()){
 */ this.osService.cadastrar(this.ordemServico).subscribe(
        (response) => {
          if (response) {
            this.ordemServico = response;
            console.log(this.ordemServico)
/*             this.geraNrOs(this.ordemServico.id);
 */
/*             this.router.navigate(['/empresa'])
 */          }
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
      

  
      
    


 /*    const encontrado = this.acessoriosSelecionados.find(elemento => elemento === acessorio);
    if(!encontrado){
      if (index === -1) {
        this.acessoriosSelecionados.push(acessorio);
      } else {
        this.acessoriosSelecionados.splice(index, 1);
      } */

/*       this.acessoriosSelecionados.push(acessorio)
 */
    

/*     this.verificarEstadosCheckboxes();
 */    



  


/*   verificarEstadosCheckboxes(): void {
    if(this.checkboxeAcessorios){
      this.checkboxeAcessorios.forEach(checkbox => {
        if(checkbox.nativeElement.checked){
          alert(checkbox.nativeElement.value.nome)
        }
      });
    }
 */
 
   
  

  removerAcessorio(acessorio:any){
    this.acessoriosSelecionados.splice(acessorio,1)
   
  }

}