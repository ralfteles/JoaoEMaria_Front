import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-produto',
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.css'],
})
export class NewProdutoComponent implements OnInit {

  formProduto: FormGroup;
  salvando: boolean = false;
  tamanhoDeRoupas: any = [];

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.obterTamanhoDeRoupas();
    this.novoProdutoForm();
  }

  obterTamanhoDeRoupas() {
    this.serviceProduto.obterTamanhosDeRoupas().subscribe(
      (result) => {
        this.tamanhoDeRoupas = result;
      },
      (error) => {
      }
    );
  } 


  novoProdutoForm() {
    this.formProduto = this.formBuilder.group({
      descricao: ['', Validators.required],
      quantidade: ['', Validators.required],
      tamanho: ['1', Validators.required],
      precoCusto: ['', Validators.required],
      valorVenda: ['', Validators.required],
    });
  }

  adicionar() {
    this.salvando = true;
    this.serviceProduto.adicionarProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.formProduto.reset();
        this.msgSucess(res.mensagem);
      },
      (error) => {
        this.salvando = false;
      }
    );
  }



  msgSucess(msg: string) {
    Swal.fire(msg, '', 'success');
  }
}
