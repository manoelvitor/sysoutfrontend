import { Component, Input, OnInit } from '@angular/core';
import { CadastroAdmService } from './cadastro-adm.service';
import { cadastroUsuario } from '../model/cadastroUsuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})


export class CadastroComponent implements OnInit {

  constructor(private cadastroAdm: CadastroAdmService, private router: Router) { }
  ngOnInit(): void {
  }

  usuario: cadastroUsuario = new cadastroUsuario()

  
  onSubmit(): void {
    console.log(cadastroUsuario);

    if(this.camposPreenchidos()){
      this.cadastroAdm.cadastrarUsuario(this.usuario).subscribe(
        (response) => {
          if (response) {
            console.log(response)
            this.usuario = response;
            this.direcionarCadastroEmpresa()
            //this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(response) } })
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }

  }

  direcionarCadastroEmpresa() :void {
    alert("Cadastro feito com sucesso! Agora cadastre dados de sua empresa que aparecerá na Ordem de Serviço.");
    this.router.navigate(['/empresa'],{ queryParams: { usuarioTelaAnterior: JSON.stringify(this.usuario) } })

  }

  camposPreenchidos() :boolean {
    if( this.usuario.nome == ''){
      alert('Campo nome obrigátorio')
      return false;
    }
    if( this.usuario.login == ''){
      alert('Campo usuario obrigátorio')
      return false;
    }
    if( this.usuario.senha == ''){
      alert('Campo senha obrigátorio')
      return false;
    }
    if( this.usuario.confirmaSenha == ''){
      alert('Campo Confirmar Senha obrigátorio')
      return false;
    }
    if( this.usuario.confirmaSenha != this.usuario.senha){
      alert("Campo 'Senha' e 'Confirmar Senha' devem ser iguais!")
      return false;
    }
    return true;

}

  uploadLogo(){
    
  }




}
