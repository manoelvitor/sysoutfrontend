import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { LoginComponent } from './login/login.component';
import { ParametrizacaoComponent } from './parametrizacao/parametrizacao.component';
import { ServicoComponent } from './servico/servico.component';
import { AcessorioComponent } from './acessorio/acessorio.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { ServicoConsultaComponent } from './servico-consulta/servico-consulta.component';
import { ServicoAdicionarComponent } from './servico-adicionar/servico-adicionar.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteConsultaComponent } from './cliente-consulta/cliente-consulta.component';
import { ClienteAdicionaComponent } from './cliente-adiciona/cliente-adiciona.component';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { TecnicoConsultaComponent } from './tecnico-consulta/tecnico-consulta.component';
import { TecnicoAdicionaComponent } from './tecnico-adiciona/tecnico-adiciona.component';
import { OsComponent } from './os/os.component';
import { OsConsultaComponent } from './os-consulta/os-consulta.component';
import { OsAdicionaComponent } from './os-adiciona/os-adiciona.component';
import { OsDetalhesComponent } from './os-detalhes/os-detalhes.component';
import { OsDocumentoComponent } from './os-documento/os-documento.component';
import { ProdutoComponent } from './produto/produto.component';
import { EmpresaEditarComponent } from './empresa-editar/empresa-editar.component';
import { ConsultaOsClienteComponent } from './consulta-os-cliente/consulta-os-cliente.component';
import { OsGeralComponent } from './os-geral/os-geral.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'parametrizacao', component: ParametrizacaoComponent },
  { path: 'servicos', component: ServicoComponent },
  { path: 'acessorios', component: AcessorioComponent },
  { path: 'categorias', component: CategoriaComponent },
  { path: 'situacoes', component: SituacaoComponent },
  { path: 'servico-consultar', component: ServicoConsultaComponent },
  { path: 'servico-adicionar', component: ServicoAdicionarComponent },
  { path: 'clientes', component: ClienteComponent },
  { path: 'cliente-consultar', component: ClienteConsultaComponent },
  { path: 'cliente-adicionar', component: ClienteAdicionaComponent },
  { path: 'tecnicos', component: TecnicoComponent },
  { path: 'tecnico-consultar', component: TecnicoConsultaComponent },
  { path: 'tecnico-adicionar', component: TecnicoAdicionaComponent },
  { path: 'os', component: OsComponent },
  { path: 'os-consultar', component: OsConsultaComponent },
  { path: 'os-adicionar', component: OsAdicionaComponent },
  { path: 'os-detalhes', component: OsDetalhesComponent },
  { path: 'os-documento', component: OsDocumentoComponent },
  { path: 'produto-consultar', component: ProdutoComponent },
  { path: 'empresa-editar', component: EmpresaEditarComponent },
  { path: 'consulta-os-cliente', component: ConsultaOsClienteComponent },
  { path: 'os-geral', component: OsGeralComponent },



  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
