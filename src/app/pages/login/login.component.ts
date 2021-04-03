import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceLoginService } from 'src/app/service/service-login.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  validando: boolean = false;
  msgError = '';

  constructor(
    public formBuilder: FormBuilder,
    public serviceAuth: ServiceLoginService,
    public router: Router,
    public storage: StorageService
  ) {}

  ngOnInit(): void {
    this.montarForm();
  }

  montarForm() {
    this.formLogin = this.formBuilder.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  autenticar() {
    this.validando = true;
   
    if(this.formLogin.value.Username == 'admin' && this.formLogin.value.Password == 'admin'){
      this.validando = false;
      this.router.navigate(['home']);
    }

    // this.serviceAuth.Autenticar(this.formLogin.value).subscribe(
    //   (res: any) => {
    //     this.validando = false;
        
    //     this.storage.setItem('usuario', res);
    //     this.router.navigate(['home']);
    //   },
    //   (error) => {
    //     this.validando = false;
    //     this.msgError = error.error.mensagem;
    //   }
    // );
  }
}
