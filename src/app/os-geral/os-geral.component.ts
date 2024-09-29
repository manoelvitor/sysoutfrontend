
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from '../os/os-model';
import { InfoTec } from '../os/infoTec-model';
import { Situacao } from '../os/situacao-model';
import { Historico } from '../os/historico-model';
import { jsPDF } from "jspdf";
import { Tecnico } from '../tecnico-consulta/tecnico-model';
import { OsConsultaService } from '../os-consulta/os-consulta.service';
import { OsDetalhesService } from '../os-detalhes/os-detalhes.service';
import { TipoMemoriaRam } from '../os-detalhes/tipoMemoriaRam';
import { ClienteConsultaService } from '../cliente-consulta/cliente-consulta.service';
import { Cliente } from '../cliente-consulta/cliente-model';
import { Servico } from '../servico-consulta/servico-model';
import { Categoria } from '../os/categoria-model';
import { Acessorio } from '../os/acessorio-model';
import { OsService } from '../os/os.service';
import { ServicoService } from '../servico/servico.service';
import { ServicoConsultaService } from '../servico-consulta/servico-consulta.service';
import { ProdutoService } from '../produto/produto.service';
import { Produto } from '../produto/produto';

@Component({
  selector: 'app-os-geral',
  templateUrl: './os-geral.component.html',
  styleUrls: ['./os-geral.component.css']
})
export class OsGeralComponent {

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private osDetalheService: OsDetalhesService,
    private osConsultaService: OsConsultaService,
    private clienteConsultaService: ClienteConsultaService,
    private osService: OsService,
    private servicoService: ServicoConsultaService,
    private produtoService: ProdutoService
  ) { }


  ordemServico: OrdemServico = new OrdemServico;
  infoTec: InfoTec = new InfoTec;
  situacoes: Situacao[] = [];
  historico: Historico = new Historico;
  historicos: Historico[] = [];
  servicos: Servico[] = [];
  tecnicos: Tecnico[] = [];
  produtos: Produto[] = []


  @ViewChild('modalTransferir', { static: false }) modalTransferir: ElementRef | undefined;
  @ViewChild('modalEditarOs', { static: false }) modalEditarOs: ElementRef | undefined;
  @ViewChild('modalAtualizaStatus', { static: false }) modalAtualizaStatus: ElementRef | undefined;
  @ViewChild('modalAdicionaProduto', { static: false }) modalAdicionaProduto: ElementRef | undefined;
  @ViewChild('modalConfirmaExc', { static: false }) modalConfirmaExc: ElementRef | undefined;
  @ViewChild('modalExcluidoSucesso', { static: false }) modalExcluidoSucesso: ElementRef | undefined;
  @ViewChild('modalAdicionaDesconto', { static: false }) modalAdicionaDesconto: ElementRef | undefined;



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

  /* this.router.navigate(['/os-detalhes'],{ queryParams: { id: JSON.stringify(id) }, queryParamsHandling: null})
   */

  id: any;
  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = JSON.parse(params['id']);
      this.consultaOsId(this.id);
    });

    this.coresStatus();

    if (this.ordemServico.infoTec == null) {
      this.ordemServico.infoTec = this.infoTec;
      this.ordemServico.infoTec.tpMemoriaRam;
    }
    this.consultarSituacoes(localStorage.getItem('idEmpresa'));
    this.consultarTecnicos(localStorage.getItem('idEmpresa'));
    this.historicos = this.ordemServico.historico;
    this.acessorios = this.ordemServico.acessorios;
    /*  this.consultarServicos(this.idEmpresaGlobal); */
    this.consultarClientes(this.ordemServico.idEmpresa);
    /*   this.consultarCategorias(this.idEmpresaGlobal);
      this.consultarAcessorios(this.idEmpresaGlobal);*/
    this.consultaStatus();


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

  adicionaServico() {
    this.osDetalheService.adicionaServico(this.ordemServico.id, this.servico.id).subscribe(
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

  consultaServicos() {
    this.servicoService.consultarServicos(this.ordemServico.idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.servicos = response;
          console.log(response)
          this.consultaOsId(this.ordemServico.id);
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );;
  }


  consultarProdutos(): void {
    this.produtoService.consultarProdutos(this.ordemServico.idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.produtos = response
        }
        //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
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

  detalhes(ordemServico: OrdemServico): void {
    this.router.navigate(['/os-detalhes'], { queryParams: { ordemServico: JSON.stringify(ordemServico) }, queryParamsHandling: null })
    console.log('ola')
  }


  consultaOsId(idOs: any): void {
    this.osDetalheService.consultaOSPorId(idOs).subscribe(
      (response) => {
        if (response) {
          this.ordemServico = response;
          this.historicos = this.ordemServico.historico;
          this.coresStatus();
          console.log(response)
          this.somaTotalOs();
        }
        //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  adicionarServico(id: any): void {
    this.router.navigate(['/servico-adicionar'], { queryParams: { id: JSON.stringify(id) }, queryParamsHandling: null })
  }

  consultarPorNomeECategoria(idEmpresa: any, nome: string, categoria: string): void {

    if (nome != "" && categoria != "") {
      this.produtoService.consultarPorNomeECategoria(idEmpresa, nome, categoria).subscribe(
        (response) => {
          if (response) {
            this.produtos = response;
          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    if (nome != "" && categoria == "") {
      this.produtoService.consultarPorNome(idEmpresa, nome).subscribe(
        (response) => {
          if (response) {
            this.produtos = response;
          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    if (nome == "" && categoria != "") {
      this.produtoService.consultarPorCategoria(idEmpresa, categoria).subscribe(
        (response) => {
          if (response) {
            this.produtos = response;
          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    if (nome == "" && categoria == "") {
      this.produtoService.consultarProdutos(idEmpresa).subscribe(
        (response) => {
          if (response) {
            this.produtos = response;
          }
        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }

  }

  /* 
    @ViewChild('id', { static: false }) idOs: ElementRef | undefined;
    @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
    @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
    @ViewChild('endereco', { static: false }) endereco: ElementRef | undefined;
    @ViewChild('cnpj', { static: false }) cnpj: ElementRef | undefined;
    @ViewChild('cpf', { static: false }) cpf: ElementRef | undefined;
    @ViewChild('rg', { static: false }) rg: ElementRef | undefined;
    @ViewChild('telefone', { static: false }) telefone: ElementRef | undefined;
    @ViewChild('email', { static: false }) email: ElementRef | undefined;
    @ViewChild('modalEditar', { static: false }) modalEditar: ElementRef | undefined;
   */




  nomeClienteBuscar: string = '';
  nomeProdutoBuscar: string = '';
  categoriaBuscar: string = '';

  clientes: Cliente[] = [];
  categorias: Categoria[] = [];
  acessorios: Acessorio[] = [];
  status: string[] = [];

  servico: Servico = new Servico;
  cliente: Cliente = new Cliente;
  categoria: Categoria = new Categoria;

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

  atualizaDesconto(){
    this.perfilToInt();
    this.somaTotalOs();
  
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Ordem de Serviço atualizado com sucesso!")
          this.consultaOsId(this.ordemServico.id);
          if (this.modalAdicionaDesconto) {
            this.modalAdicionaDesconto.nativeElement.querySelector('.close').click();
          }
    
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




  consultaStatus(): void {
    this.osDetalheService.consultaStatus().subscribe(
      (response) => {
        if (response) {
          this.status = response;
        }


        //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
      }
      ,
      (error) => {
        console.log(error);
      }
    );
    this.consultaOsId(this.ordemServico.id)
  }


  selecionaCliente(cliente: any) {
    this.ordemServico.cliente.nome = cliente.nome;
  }

  selecionaProduto(produto: any) {
    this.ordemServico.produtos.push(produto);
    if (this.modalAdicionaProduto) {
      this.modalAdicionaProduto.nativeElement.querySelector('.close').click();
    }
    this.perfilToInt();
    this.somaTotalOs();
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Produto adicionado a OS!")
          this.consultaOsId(this.ordemServico.id);
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );



  }


  selecionaCategoria(categoria: any) {
    this.ordemServico.categoria.nome = categoria.nome;
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

  acessoriosSelecionados: Acessorio[] = []


  @ViewChildren('checkboxeAcessorios') checkboxeAcessorios: QueryList<ElementRef> | undefined;




  marcaAcessorios() {
    for (let i = 0; i < this.acessorios.length; i++) {
      for (let j = 0; j < this.ordemServico.acessorios.length; i++) {

        const indicesParaSelecionar = [0, 2, 4];

        if (this.checkboxeAcessorios) {
          this.checkboxeAcessorios.forEach((checkbox, index) => {
            // Verifica se o índice está na lista de índices a serem selecionados.
            if (indicesParaSelecionar.includes(index)) {
              checkbox.nativeElement.checked = true; // Marca o checkbox como selecionado.
            }
          });

        }

      }
    }
  }


  selecionaAcessorios(acessorio: any, i: any) {
    var index: number = this.acessoriosSelecionados.indexOf(acessorio);

    const encontrado = this.acessoriosSelecionados.find(elemento => elemento === acessorio);
    if (this.checkboxeAcessorios) {
      console.log(i)
      if (this.checkboxeAcessorios.get(i)?.nativeElement.checked) {
        if (!encontrado) {
          this.acessoriosSelecionados.push(acessorio);

        }

      }
      else {
        if (encontrado) {
          this.acessoriosSelecionados.find((elemento, i) => elemento === acessorio ? this.acessoriosSelecionados.splice(i, 1) : '');
        }
      }
    }
    this.ordemServico.acessorios = this.acessoriosSelecionados;
  }


  removerAcessorio(acessorio: any) {
    this.acessoriosSelecionados.splice(acessorio, 1);
    this.atualizaGeral();


  }

  consultarAcessorios(idEmpresa: any): void {
    this.marcaAcessorios()
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

  perfilToInt() {

    this.ordemServico.tecnicoResponsavel.perfis[0] == 'ADMIN' ? this.ordemServico.tecnicoResponsavel.perfis[0] = 1 : 2;
    this.ordemServico.tecnicoResponsavel.perfis[1] == 'TECNICO' ? this.ordemServico.tecnicoResponsavel.perfis[1] = 2 : 1;

  }

  somaTotalOs(){
    const totalServicos = this.ordemServico.servicosEfetuados.reduce((acumulador, servicos) => acumulador + servicos.valor, 0);
    const totalProdutos = this.ordemServico.produtos.reduce((acumulador, produtos) => acumulador + produtos.valor, 0);

    console.log(totalServicos);
    console.log(totalProdutos);

    this.ordemServico.valorTotal = (totalProdutos + totalServicos + this.ordemServico.valorOrcamento) - this.ordemServico.valorDesconto; 

  }



  removerProduto(i: any) {
    this.ordemServico.produtos.splice(i, 1);
    this.perfilToInt();
    this.somaTotalOs();
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Ordem de Serviço atualizado com sucesso!")
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
  removerServico(i: any) {
    this.ordemServico.servicosEfetuados.splice(i, 1);
    console.log(this.ordemServico);
    this.perfilToInt();
    this.somaTotalOs();
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Ordem de Serviço atualizado com sucesso!")
          console.log(response)
          if (this.modalEditarOs) {
            this.modalEditarOs.nativeElement.querySelector('.close').click();
          }
          if (this.modalAtualizaStatus) {
            this.modalAtualizaStatus.nativeElement.querySelector('.close').click();
          }
          this.consultaOsId(this.ordemServico.id);

        }
      }
      ,
      (error) => {
        console.log(error);

      }
    );
  }


  atualizaGeral() {
    this.perfilToInt();
    this.coresStatus();
    this.somaTotalOs();
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Ordem de Serviço atualizado com sucesso!")
          this.consultaOsId(this.ordemServico.id);
          if (this.modalEditarOs) {
            this.modalEditarOs.nativeElement.querySelector('.close').click();
          }
          if (this.modalAtualizaStatus) {
            this.modalAtualizaStatus.nativeElement.querySelector('.close').click();
          }
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );

  }


  atualizaServico() {
    this.perfilToInt();
    this.somaTotalOs();
    if (this.servico != null) {
      this.ordemServico.servicosEfetuados.push(this.servico);
    }
    this.osDetalheService.atualizar(this.ordemServico).subscribe(
      (response) => {
        if (response) {
          alert("Ordem de Serviço atualizado com sucesso!")
          this.consultaOsId(this.ordemServico.id);
          if (this.modalEditarOs) {
            this.modalEditarOs.nativeElement.querySelector('.close').click();
          }
          if (this.modalAtualizaStatus) {
            this.modalAtualizaStatus.nativeElement.querySelector('.close').click();
          }
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  excluirOs(){
    this.osDetalheService.excluir(this.id).subscribe(
      (response) => {
        if (response) {
          if(this.modalExcluidoSucesso){
            this.modalExcluidoSucesso.nativeElement.querySelector('.close').click();
          }
          if(this.modalConfirmaExc){
            this.modalConfirmaExc.nativeElement.querySelector('.close').click();
          }
/*           this.router.navigate(['/os-consultar'])
 */      
         
  
             
        }

      }
      ,
      (error) => {
        console.log(error);
      });
    }
  

  corStatus: string = '';

  coresStatus() {
    if (this.ordemServico.status == "ABERTO") {
      this.corStatus = 'blue'
    }
    if (this.ordemServico.status == 'EM_ANDAMENTO') {
      this.corStatus = '#adff2f'

    }
    if (this.ordemServico.status == 'PENDENTE') {
      this.corStatus = 'yellow'
    }
    if (this.ordemServico.status == 'CONCLUIDA') {
      this.corStatus = 'white'
    }
    if (this.ordemServico.status == 'CANCELADA') {
      this.corStatus = 'red'
    }


  }

}
