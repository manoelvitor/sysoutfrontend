import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProdutoService } from './produto.service';
import { Router } from '@angular/router';
import { Produto } from './produto';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {

  constructor(private produtoService: ProdutoService, private router: Router) { }
  ngOnInit(): void {
  }

  produtos: Produto[] = [];
  produto: Produto = new Produto;
  itens: any[] = [];
  nomeBuscar: string = '';
  categoriaBuscar: string ='';
  labelEditar:boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');



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

  consultarPorNomeECategoria(idEmpresa: any, nome: string, categoria: string): void {

    if(nome != "" && categoria != ""){
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
    if(nome != "" && categoria == ""){
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
    if(nome == "" && categoria != ""){
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
    if(nome == "" && categoria == ""){
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

  excluir(id:any): void {
    this.produtoService.excluir(id).subscribe(
      (response) => {
        if (response) {
          alert('Produto deletado com sucesso!')   
          this.router.navigate(['/servico-consultar']);
          this.consultarProdutos(this.idEmpresaGlobal);   
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
  @ViewChild('categoria', { static: false }) categoria: ElementRef | undefined;
  @ViewChild('codigo', { static: false }) codigo: ElementRef | undefined;

  editar(produto: Produto, flag: boolean) {
    if(flag){
      this.labelEditar = true
    }
    if(!flag){
      this.labelEditar = false
    }
  
    if (this.id) {
      this.id.nativeElement.value = produto.id;
    }
    if (this.nome) {
      this.nome.nativeElement.value = produto.nome;
    }
    if (this.descricao) {
      this.descricao.nativeElement.value = produto.descricao;
    }
    if (this.valor) {
      this.valor.nativeElement.value = produto.valor == undefined ? 0.00 : produto.valor;
    }
    if (this.idEmpresa) {
      this.idEmpresa.nativeElement.value = produto.idEmpresa;
    } 
  }

  salvar(produto: Produto, editar: boolean): void {
    produto.idEmpresa = localStorage.getItem("idEmpresa");
    if (editar) {
      if (this.id) {
        produto.id = this.id.nativeElement.value
      }
      if (this.nome) {
        produto.nome = this.nome.nativeElement.value
      }
      if (this.descricao) {
        produto.descricao = this.descricao.nativeElement.value;
      }
      if (this.valor) {
        produto.valor = this.valor.nativeElement.value
      }
      if (this.categoria) {
        produto.categoria = this.categoria.nativeElement.value
      }
      if (this.codigo) {
        produto.codigo = this.codigo.nativeElement.value
      }
      this.produtoService.atualizar(produto).subscribe(
        (response) => {
          if (response) {
            alert("Serviço alterado com sucesso!")
            this.router.navigate(['/produto-consultar']);
            this.consultarProdutos(produto.idEmpresa);
          }

        }
        ,
        (error) => {
          console.log(error);
        }
      );
    }
    else {
      produto.id = null;
      this.produtoService.adicionar(produto).subscribe(
        (response) => {
          if (response) {
            alert("Produto adicionado com sucesso!")
            this.router.navigate(['/produto-consultar']);
            this.consultarProdutos(this.idEmpresaGlobal);
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
