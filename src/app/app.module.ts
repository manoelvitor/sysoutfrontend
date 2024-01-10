import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CadastroAdmService } from './cadastro/cadastro-adm.service';
import { AuthService } from './login/auth.service';
import { EmpresaService } from './empresa/empresa.service';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ParametrizacaoComponent } from './parametrizacao/parametrizacao.component';
import { ServicoComponent } from './servico/servico.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { AcessorioComponent } from './acessorio/acessorio.component';
import { SituacaoComponent } from './situacao/situacao.component';
import { ServicoService } from './servico/servico.service';
import { CategoriaService } from './categoria/categoria.service';
import { AcessorioService } from './acessorio/acessorio.service';
import { SituacaoService } from './situacao/situacao.service';
import { ServicoConsultaComponent } from './servico-consulta/servico-consulta.component';
import { ServicoAdicionarComponent } from './servico-adicionar/servico-adicionar.component';
import { ServicoAdicionarService } from './servico-adicionar/servico-adicionar.service';
import { ServicoConsultaService } from './servico-consulta/servico-consulta.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteConsultaComponent } from './cliente-consulta/cliente-consulta.component';
import { ClienteAdicionaComponent } from './cliente-adiciona/cliente-adiciona.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TecnicoComponent } from './tecnico/tecnico.component';
import { TecnicoConsultaComponent } from './tecnico-consulta/tecnico-consulta.component';
import { TecnicoAdicionaComponent } from './tecnico-adiciona/tecnico-adiciona.component';
import { OsComponent } from './os/os.component';
import { OsConsultaComponent } from './os-consulta/os-consulta.component';
import { OsAdicionaComponent } from './os-adiciona/os-adiciona.component';
import { ClienteConsultaService } from './cliente-consulta/cliente-consulta.service';
import { OsDetalhesComponent } from './os-detalhes/os-detalhes.component';
import { OsDetalhesService } from './os-detalhes/os-detalhes.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { OsDocumentoComponent } from './os-documento/os-documento.component';
import { ProdutoComponent } from './produto/produto.component';
import { EmpresaEditarComponent } from './empresa-editar/empresa-editar.component';
import { ConsultaOsClienteComponent } from './consulta-os-cliente/consulta-os-cliente.component';
import { OsConsultaService } from './os-consulta/os-consulta.service';
import { OsGeralComponent } from './os-geral/os-geral.component';


export const options: Partial<null|IConfig> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CadastroComponent,
    LoginComponent,
    EmpresaComponent,
    ParametrizacaoComponent,
    ServicoComponent,
    CategoriaComponent,
    AcessorioComponent,
    SituacaoComponent,
    ServicoConsultaComponent,
    ServicoAdicionarComponent,
    ClienteComponent,
    ClienteConsultaComponent,
    ClienteAdicionaComponent,
    TecnicoComponent,
    TecnicoConsultaComponent,
    TecnicoAdicionaComponent,
    OsComponent,
    OsConsultaComponent,
    OsAdicionaComponent,
    OsDetalhesComponent,
    OsDocumentoComponent,
    ProdutoComponent,
    EmpresaEditarComponent,
    ConsultaOsClienteComponent,
    OsGeralComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    NgxMaskDirective, NgxMaskPipe,
    NgxCurrencyModule,
    ModalModule.forRoot(),
    DatePipe
 
  ],
  providers: [
    AuthService, 
    CadastroAdmService,
    EmpresaService, 
    ServicoService,
    CategoriaService,
    AcessorioService,
    SituacaoService, 
    ServicoAdicionarService,
    ServicoConsultaService,
    ClienteConsultaService,
    ServicoConsultaService,
    OsDetalhesService,
    OsConsultaService,
    OsDetalhesService,
    provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
