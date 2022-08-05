import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-new-produto',
  templateUrl: './new-produto.component.html',
  styleUrls: ['./new-produto.component.css'],
})
export class NewProdutoComponent implements OnInit {
  formProduto: FormGroup;
  salvando: boolean = false;
  tamanhoDeRoupas: any = [];
  fileToUpload: any;
  nomeImagem: string;
  qtdTamanho: any = 0;

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.obterTamanhoDeRoupas();
    this.novoProdutoForm();
  }

  obterTamanhoDeRoupas() {
    this.serviceProduto.obterTamanhosDeRoupas().subscribe(
      (result) => {
        this.tamanhoDeRoupas = result;
      },
      (error) => {}
    );
  }

  novoProdutoForm() {
    this.formProduto = this.formBuilder.group({
      codigo: [''],
      descricao: [''],
      observacao: [''],
      precoCusto: ['', Validators.required],
      valorVenda: ['', Validators.required],
      imagem: [''],
      produtoTamanho: this.formBuilder.array([]),
    });
  }

  adicionar() {
    this.salvando = true;

    this.formProduto.controls['imagem'].setValue(this.nomeImagem);

    this.serviceProduto.adicionarProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.formProduto.reset();
        this.msgSucess(res.data.message);
        this.removerTodosTamanhos();
      },
      (error) => {
        this.salvando = false;
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  msgSucess(msg: string) {
    Swal.fire(msg, '', 'success');
  }

  uploadFileAndAdd() {
    this.salvando = true;

    const formData: FormData = new FormData();
    formData.append('Image', this.fileToUpload, this.fileToUpload.name);

    this.serviceProduto.uploadFoto(formData).subscribe((res: any) => {
      this.nomeImagem = res.data;
      this.adicionar();
    }),
      (error) => {
        this.salvando = false;
        console.log('Erro ao fazer upload da imagem');
      };
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
      quantidade: 0,
    });
  }

  removerTodosTamanhos() {
    while (this.produtoTamanho().length !== 0) {
      this.produtoTamanho().removeAt(0);
    }
  }
}
