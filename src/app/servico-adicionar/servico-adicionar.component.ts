import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { ServicoConsultaService } from '../servico-consulta/servico-consulta.service';
import { Servico } from '../servico-consulta/servico-model';
import { Produto } from '../produto/produto';
import { ProdutoService } from '../produto/produto.service';
import { OsDetalhesService } from '../os-detalhes/os-detalhes.service';
import { OrdemServico } from '../os/os-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servico-adicionar',
  templateUrl: './servico-adicionar.component.html',
  styleUrls: ['./servico-adicionar.component.css']
})
export class ServicoAdicionarComponent {
  constructor(
    private servicoConsultaService: ServicoConsultaService,
    private produtoService: ProdutoService,
    private osDetalheService: OsDetalhesService,
    private activateRoute: ActivatedRoute


  ) {



  }
  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe(params => {
      this.id = JSON.parse(params['id']);
      this.consultaOsId(this.id);
    });
    this.consultarServicos(this.idEmpresaGlobal);
    this.consultarProdutos(this.idEmpresaGlobal);
    this.consultaOsId(this.id)
  }

  id: any;
  ordemServico: OrdemServico = new OrdemServico;
  servico: Servico = new Servico;
  servicos: Servico[] = [];
  produtosSelecionados: Produto[] = [];
  produtos: Produto[] = [];
  nomeServicoBuscar: string = '';
  idEmpresaGlobal = localStorage.getItem("idEmpresa");

  consultarPorNomeServico(idEmpresa: any, nome: string): void {
    this.servicoConsultaService.consultarPorNome(idEmpresa, nome).subscribe(
      (response) => {
        if (response) {
          this.servicos = response;
          console.log(response);
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }


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
  @ViewChildren('checkboxeProdutos') checkboxeProdutos: QueryList<ElementRef> | undefined;

  valorTotal:any=0;

  selecionaProdutos(produto: any, i: any) {

    const encontrado = this.produtosSelecionados.find(elemento => elemento === produto);


    if (this.checkboxeProdutos) {
      console.log(this.produtosSelecionados)
      if (this.checkboxeProdutos.get(i)?.nativeElement.checked) {
        if (!encontrado) {
          this.produtosSelecionados.push(produto);

        }

      }
      else {
        if (encontrado) {
          this.produtosSelecionados.find((elemento, i) => elemento === produto ? this.produtosSelecionados.splice(i, 1) : '');
        }
      }
      this.calcularServico();
    }
  }

  calcularServico(){
    this.valorTotal = 0;
    this.produtosSelecionados.forEach(produto => {
      this.valorTotal+=produto.valor;
      
    });
    console.log(this.valorTotal);

  }


  consultarProdutos(idEmpresa: any): void {
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


  selecionaServico(servico: any) {
    this.servico = servico;
  }

  consultaOsId(idOs: any): void {
    this.osDetalheService.consultaOSPorId(idOs).subscribe(
      (response) => {
        if (response) {
          this.ordemServico = response;
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


}



