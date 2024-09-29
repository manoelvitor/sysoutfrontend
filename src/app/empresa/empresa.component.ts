import { Component, ViewChild, ElementRef } from '@angular/core';
import { cadastroUsuario } from '../model/cadastroUsuario';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroAdmService } from '../cadastro/cadastro-adm.service';
import { EmpresaService } from './empresa.service';
import { Empresa } from '../model/empresa';


@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {


  usuarioCadastrado: cadastroUsuario = new cadastroUsuario();
  empresa: Empresa = new Empresa()


  constructor(
    private activateRoute: ActivatedRoute,
    private cadastroAdm: CadastroAdmService,
    private cadastroEmpresa: EmpresaService,
    private router: Router,

  ) { }

  @ViewChild('nomeFantasia', { static: false }) nomeFantasia: ElementRef | undefined;


  ngAfterViewInit() {
    if (this.nomeFantasia) {
      this.nomeFantasia.nativeElement.focus();
      this.nomeFantasia.nativeElement.required;
    }
  }

  ngOnInit() {
    this.activateRoute.queryParams.subscribe(params => {
      this.usuarioCadastrado = JSON.parse(params['usuarioTelaAnterior']);
      console.log(this.usuarioCadastrado)
    });
  }

  img: FormData = new FormData;
  uploadLogo() {

    this.cadastroEmpresa.uploadLogo(this.img).subscribe(
      (response) => {
        if (response) {

          console.log(response)    
        }

      }
      ,
      (error) => {
        console.log(error);
      }

    )

  }

  onSubmit(): void {
    if (this.camposPreenchidos()) {
      this.cadastroEmpresa.cadastrarEmpresa(this.empresa).subscribe(
        (response) => {
          if (response) {
            console.log(response.id);
            this.empresa = response;
            console.log("empresa");
            console.log(this.empresa);
            this.atualizaIdEmpresa();
            this.cadastroAdm.atribuiEmpresa(this.usuarioCadastrado, this.empresa.id).subscribe(

              (response) => {
                if (response) {
                  alert('Cadastro feito com sucesso!')
                }
              },
              (error) => {
                console.log(error);
              }
            );

          }
          this.uploadLogo()
          alert('Cadastro feito com sucesso!')
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
      this.usuarioCadastrado.idEmpresa = this.empresa.id;


    };
  }



  atualizaIdEmpresa(): void {


  }
  myValue: any;
  camposPreenchidos(): boolean {
    if (this.empresa.nomeFantasia == '') {
      alert('Campo nome fantasia obrigátorio')
      return false;
    }
    if (this.empresa.razaoSocial == '') {
      alert('Campo razão social obrigátorio')
      return false;
    }
    if (this.empresa.cnpj == '') {
      alert('Campo cnpj obrigátorio')
      return false;
    }

    return true;

  }



}


