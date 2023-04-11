import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
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
  exibirMensagem: boolean = false;
  tamanhoDeRoupas: any = [];
  qtdProdutoTamanho: any;
  fileToUpload: any;
  imagemAdicionada: any;
  nomeImagem: string;

  constructor(
    public formBuilder: FormBuilder,
    public serviceProduto: ServiceProdutoService,
    public router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
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
        this.popularProdutoTamanho();
      },
      (error) => {}
    );
  }

  editProdutoForm() {

    let objectURL = 'data:image/png;base64,' + this.produto.imagemBit;
    this.imagemAdicionada = this.sanitizer.bypassSecurityTrustUrl(objectURL),

    this.formProduto = this.formBuilder.group({
      produtoId: [this.produto.produtoId],
      nome: [this.produto.nome, Validators.required],
      cor: [this.produto.cor],
      marca: [this.produto.marca],
      categoria: [this.produto.categoria],
      generoProduto: [this.produto.generoProduto],
      precoCusto: [this.produto.precoCusto, Validators.required],
      valorVenda: [this.produto.valorVenda, Validators.required],
      promocao: [this.produto.promocao].toLocaleString(),
      descricao:[this.produto.descricao],
      imagem: [this.produto.imagem],
      tamanhoProduto: this.formBuilder.array([])
    });
  }

  popularProdutoTamanho() {
    for (var i = 0; i < this.produto.tamanhoProduto.length; i++) {
      this.tamanhoProduto().push(
        this.formBuilder.group({
          tamanho: this.produto.tamanhoProduto[i].tamanho,
          descricao: this.produto.tamanhoProduto[i].descricao,
          quantidade: this.produto.tamanhoProduto[i].quantidade,
        })
      );
    }
    this.qtdProdutoTamanho = this.produto.tamanhoProduto.length;
  }

  atualizar() {
    this.salvando = true;

    if (this.fileToUpload != undefined) {
      this.formProduto.controls['imagem'].setValue(this.nomeImagem);
    }

    this.serviceProduto.atualizarProduto(this.formProduto.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.exibirMensagem = true;
        setTimeout(()=>{
            this.exibirMensagem = false;
        }, 2000);
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
    this.tamanhoProduto().push(this.newQuantity());
  }

  removerTamanho(i: number) {
    this.tamanhoProduto().removeAt(i);
  }

  tamanhoProduto(): FormArray {
    return this.formProduto.get('tamanhoProduto') as FormArray;
  }

  newQuantity(): FormGroup {
    return this.formBuilder.group({
      tamanho: '',
      descricao: '',
      quantidade: '',
      cor:''
    });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.imagemAdicionada = null
  }

  uploadFileAndAdd() {
    if (this.fileToUpload != undefined) {
      this.salvando = true;
      const formData: FormData = new FormData();
      formData.append('Image', this.fileToUpload, this.fileToUpload.name);

      this.serviceProduto.uploadFoto(formData).subscribe((res: any) => {
        this.nomeImagem = res.data;
        this.atualizar();
      }),
        (error) => {
          this.salvando = false;
          console.log('Erro ao fazer upload da imagem');
        };
    } else {
      this.atualizar();
    }
  }
}
