import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  tamanhoDeRoupas: any = [];
  qtdProdutoTamanho: any;

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => (this.id = params.id));
    this.obterProdutoPorId();
    this.obterTamanhoDeRoupas();

    
  }

  obterTamanhoDeRoupas() {
    this.serviceProduto.obterTamanhosDeRoupas().subscribe(
      (result) => {
        this.tamanhoDeRoupas = result;
      },
      (error) => {}
    );
  }
  obterProdutoPorId() {
    this.serviceProduto.obterProdutoPorId(this.id).subscribe(
      (result: ProdutoModel) => {
        this.produto = result;
        this.editProdutoForm();
        this.popularProdutoTamanho();
      },
      (error) => {}
    );
  }

  editProdutoForm() {
    this.formProduto = this.formBuilder.group({
      produtoId: [this.produto.produtoId],
      codigo: [this.produto.codigo],
      descricao: [this.produto.descricao, Validators.required],
      observacao: [this.produto.observacao],
      precoCusto: [this.produto.precoCusto, Validators.required],
      valorVenda: [this.produto.valorVenda, Validators.required],
      imagem: [''],

      produtoTamanho: this.formBuilder.array([])
    });
  }

  popularProdutoTamanho() {
    for (var i = 0; i < this.produto.produtoTamanho.length; i++) {
      this.produtoTamanho().push(
        this.formBuilder.group({
          tamanho: this.produto.produtoTamanho[i].tamanho,
          descricao: this.produto.produtoTamanho[i].descricao,
          quantidade: this.produto.produtoTamanho[i].quantidade,
          tamanhoTexto: this.produto.produtoTamanho[i].tamanhoTexto,
        })
      );
    }

    this.qtdProdutoTamanho = this.produto.produtoTamanho.length;
  }

  atualizar() {
    this.salvando = true;
    this.serviceProduto.atualizarProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.msgSucess(res.data.message);
      },
      (error) => {
        this.salvando = false;
      }
    );
  }

  msgSucess(msg: string) {
    Swal.fire(msg, '', 'success');
  }

  //Loop dos pares
  adicionarTamanho() {
    this.produtoTamanho().push(this.newQuantity());
  }

  removerTamanho(i: number) {
    this.produtoTamanho().removeAt(i);
  }

  produtoTamanho(): FormArray {
    return this.formProduto.get('produtoTamanho') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      tamanho: '',
      descricao: '',
      quantidade: '',
    });
  }
}
