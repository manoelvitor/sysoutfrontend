import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoriaService } from './categoria.service';
import { Router } from '@angular/router';
import { Categoria } from '../os/categoria-model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  constructor(private service: CategoriaService, private router: Router) { }
  ngOnInit(): void {
  }

  categorias: Categoria[] = [];
  categoria: Categoria = new Categoria;
  itens: any[] = [];
  nomeBuscar: string = '';
  labelEditar: boolean = false;
  idEmpresaGlobal = localStorage.getItem('idEmpresa');



  consultar(idEmpresa: any): void {
    this.service.consultar(idEmpresa).subscribe(
      (response) => {
        if (response) {
          this.categorias = response;
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
    this.service.consultarPorNome(idEmpresa, nome).subscribe(
      (response) => {
        if (response) {
          this.categorias = response;
          console.log(response);
        }
      }
      ,
      (error) => {
        console.log(error);
      }
    );
  }

  excluir(id: any): void {
    this.service.excluir(id).subscribe(
      (response) => {
        if (response) {
          alert('Serviço deletado com sucesso!')
          this.router.navigate(['/categorias']);
          this.consultar(this.idEmpresaGlobal);
        }
      }
      ,
      (error) => {
        alert('Não foi possivel excluir esse item')
        console.log(error);
      }
    );
  }




  @ViewChild('id', { static: false }) id: ElementRef | undefined;
  @ViewChild('idEmpresa', { static: false }) idEmpresa: ElementRef | undefined;
  @ViewChild('nome', { static: false }) nome: ElementRef | undefined;
  @ViewChild('descricao', { static: false }) descricao: ElementRef | undefined;
  @ViewChild('valor', { static: false }) valor: ElementRef | undefined;

  editar(categoria: Categoria, flag: boolean) {
    if (flag) {
      this.labelEditar = true
    }
    if (!flag) {
      this.labelEditar = false
    }

    if (this.id) {
      this.id.nativeElement.value = categoria.id;
    }
    if (this.nome) {
      this.nome.nativeElement.value = categoria.nome;
    }
    if (this.descricao) {
      this.descricao.nativeElement.value = categoria.descricao;
    }

    if (this.idEmpresa) {
      this.idEmpresa.nativeElement.value = categoria.idEmpresa;
    }


  }

  salvar(categoria: Categoria, editar: boolean): void {
    categoria.idEmpresa = localStorage.getItem("idEmpresa");
    if (editar) {
      if (this.id) {
        categoria.id = this.id.nativeElement.value
      }
      if (this.nome) {
        categoria.nome = this.nome.nativeElement.value
      }
      if (this.descricao) {
        categoria.descricao = this.descricao.nativeElement.value;
      }

      this.service.atualizar(categoria).subscribe(
        (response) => {
          if (response) {
            alert("Serviço alterado com sucesso!")
            this.router.navigate(['/categorias']);
            this.consultar(categoria.idEmpresa);
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
      categoria.id = null;
      this.service.adicionar(categoria).subscribe(
        (response) => {
          console.log(categoria);

          if (response) {
            alert("Produto adicionado com sucesso!")
            this.router.navigate(['/categorias']);
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
