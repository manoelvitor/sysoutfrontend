import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Usuario } from './usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public usuario: Usuario  = new Usuario();
  logado = this.authService.isLoggedIn();


  constructor(private authService: AuthService, private router: Router ){

  }
  ngOnInit(): void {
  }

  efetuarLogin(){
    console.log(this.usuario)
  }

   senhaCorreta = true;

  onSubmit(): void {
    this.authService.login(this.usuario.login, this.usuario.senha).subscribe(
      (response) => {
        if (response.token) {
          this.authService.setToken(response.token);
          this.authService.setNome(response.username);
          this.authService.setIdEmpresa(response.idEmpresa);
          this.authService.setId(response.id);
          this.authService.setIsAdmin(response.administrador);

          console.log(response)
         

          this.authService.mostrarMenuEmitter.emit(true);
          this.router.navigate(['/parametrizacao'])
        }
      },
      (error) => {
        this.senhaCorreta = false;
        this.authService.mostrarMenuEmitter.emit(false);

        console.log(error);
      }
    );
  }

}
