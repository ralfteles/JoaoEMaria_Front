import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ServiceVendaService } from 'src/app/service/service-venda.service';
import Swal from 'sweetalert2';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-new-venda',
  templateUrl: './new-venda.component.html',
  styleUrls: ['./new-venda.component.css'],
})
export class NewVendaComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    public serviceVenda: ServiceVendaService,
    public serviceProduto: ServiceProdutoService,
    private modalService: NgbModal
  ) {}

  @ViewChild('produtoModal') detalheModal: TemplateRef<any>;

  formVenda: FormGroup;
  formasDePagamento: any = [];
  produtos: any = [];
  produtosVenda: any = [];
  parcelasVenda: any = [];
  salvando: boolean = false;
  calculandoVenda: boolean = false;
  isParcelado: boolean = false;
  quantidadeDeParcelas: number;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  ngOnInit(): void {
    this.obterFormasDePagamento();
    this.obterProdutos();
    this.novaVendaForm();
  }

  novaVendaForm() {
    this.formVenda = this.formBuilder.group({
      cliente: ['', Validators.required],
      preco: ['', Validators.required],
      observacao: [''],
      formaDePagamento: ['1', Validators.required],
      quantidadeDeParcelas:[''],
      produtosNaVenda: [],
      parcelasNaVenda: [],
    });
  }

  obterFormasDePagamento() {
    this.serviceVenda.obterFormasDePagamento().subscribe(
      (result) => {
        this.formasDePagamento = result;
      },
      (error) => {}
    );
  }

  adicionar() {
    this.salvando = true;
    this.formVenda.controls['produtosNaVenda'].setValue(this.produtosVenda);
    this.serviceVenda.adicionarVenda(this.formVenda.value).subscribe(
      (res: any) => {
        this.salvando = false;
        this.formVenda.reset();
        this.produtosVenda = [];
        this.msgSucess(res.mensagem);
      },
      (error) => {
        this.salvando = false;
      }
    );
  }

  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: ProdutoModel[]) => {
        this.produtos = result;
      },
      (error) => {}
    );
  }

  msgSucess(msg: string) {
    Swal.fire(msg, '', 'success');
  }

  msgInfo(msg: string) {
    Swal.fire(msg, '', 'info');
  }


  openModal() {
    var i;
    for (i = 0; i < this.produtos.length; i++) {
      this.produtos[i].selecionado = false;
      if (this.produtosVenda.includes(this.produtos[i])) {
        this.produtos[i].selecionado = true;
      }
    }

    this.modalService.open(this.detalheModal, { size: 'xl' });
  }

  checkProduto(e, produto) {
    this.formVenda.controls['preco'].setValue('');
    if (e.target.checked) {
      this.produtosVenda.push(produto);
      console.log(this.produtosVenda);
    } else {
      this.produtosVenda.splice(this.produtosVenda.indexOf(produto), 1);
    }
  }

  calcularTotaDaVenda() {
    this.calculandoVenda = true;

    this.serviceVenda.calcularVenda(this.produtosVenda).subscribe(
      (res: any) => {
        this.calculandoVenda = false;
        this.formVenda.controls['preco'].setValue(res);
      },
      (error) => {
        this.calculandoVenda = false;
        console.log('Erro ao calcular total da venda');
      }
    );
  }

  calularParcelas() {
    this.formVenda.controls['parcelasNaVenda'].setValue([]);
    this.parcelasVenda = [];

    if(this.formVenda.value.quantidadeDeParcelas == ''){
      this.msgInfo('Informe a quantidade de parcelas')
      return;
    }
    this.serviceVenda
      .calcularParcelas(this.formVenda.value.quantidadeDeParcelas, this.formVenda.value.preco)
      .subscribe(
        (res: any) => {
          this.parcelasVenda = res;
          this.formVenda.controls['parcelasNaVenda'].setValue(
            this.parcelasVenda
          );
        },
        (error) => {
          console.log('Erro ao calcular total da venda');
        }
      );
  }

  selectFormaDePagamento(tipo) {
    if (tipo == '4') this.isParcelado = true;
    else {
      this.isParcelado = false;
      this.formVenda.controls['parcelasNaVenda'].setValue([]);
      this.parcelasVenda = [];
    }
  }
}
