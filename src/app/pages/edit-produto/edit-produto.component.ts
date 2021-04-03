import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-produto',
  templateUrl: './edit-produto.component.html',
  styleUrls: ['./edit-produto.component.css'],
})
export class EditProdutoComponent implements OnInit {
  formProduto: FormGroup;
  produto: ProdutoModel;
  id: number;
  salvando: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = params.id));
    this.obterProdutoPorId();
  }

  obterProdutoPorId() {
    this.serviceProduto.obterProdutoPorId(this.id).subscribe(
      (result: ProdutoModel) => {
        this.produto = result;
        this.editProdutoForm();
      },
      (error) => {}
    );
  }

  editProdutoForm() {
    this.formProduto = this.formBuilder.group({
      produtoId: [this.produto.produtoId],
      imagem: [this.produto.imagem, ''],
      nome: [this.produto.nome, Validators.required],
      valor: [this.produto.valor, Validators.required],
    });
  }

  atualizar() {
    this.salvando = true;
    this.serviceProduto.atualizarProduto(this.formProduto.value).subscribe(
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
