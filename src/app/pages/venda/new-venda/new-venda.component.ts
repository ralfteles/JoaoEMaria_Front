import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
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

  @ViewChild('produtoModal') detalheModal: any;
  @ViewChild('produtoTamanhoModal') produtoTamanhoModal: any;

  formVenda: FormGroup;
  formasDePagamento: any = [];
  produtos: any = [];
  produtosTamanho: any = [];
  produtosVenda: any = [];
  parcelasVenda: any = [];
  salvando: boolean = false;
  calculandoVenda: boolean = false;
  isParcelado: boolean = false;
  confirmarReserva:boolean = false;
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
      quantidadeDeParcelas: [''],
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
        this.msgSucess(res.data.message);
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
    for (var i = 0; i < this.produtos.length; i++) {
      this.produtos[i].selecionado = false;
      if (this.produtosVenda.includes(this.produtos[i])) {
        this.produtos[i].selecionado = true;
      }
    }

    this.modalService.open(this.detalheModal, { size: 'xl' });
  }

  openModalTamanho(produtoId: any) {
    this.produtosTamanho = this.produtos.find(
      (x: { produtoId: any }) => x.produtoId == produtoId
    ).produtoTamanho;

    for (var i = 0; i < this.produtosTamanho.length; i++) {
      if((this.produtosTamanho[i].selecionado || this.produtosTamanho[i].selecionado == undefined)
       && (this.produtosTamanho[i].quantidadeCompra <= 0 || this.produtosTamanho[i].quantidadeCompra == undefined)){
        this.produtosTamanho[i].quantidadeCompra = 0;
        this.produtosTamanho[i].selecionado = false
      }
    }

    this.modalService.open(this.produtoTamanhoModal, { size: 'xl' });
  }

  checkProdutoTamanho(e, produto) {
    if (e.target.checked) {
      for (var i = 0; i < this.produtosTamanho.length; i++) {
        if (
          this.produtosTamanho[i].produtoTamanhoId == produto.produtoTamanhoId
        )
          this.produtosTamanho[i].selecionado = true;
      }
    } else {
      for (var i = 0; i < this.produtosTamanho.length; i++) {
        if (
          this.produtosTamanho[i].produtoTamanhoId == produto.produtoTamanhoId
        ){
          this.produtosTamanho[i].selecionado = false;
          this.produtosTamanho[i].quantidadeCompra = 0;
        }
        
      }
    }
  }

  setQuantidadeCompra(produtoTamanho, quantidade: number) {
    for (var i = 0; i < this.produtosTamanho.length; i++) {
      if (
        this.produtosTamanho[i].produtoTamanhoId ==
        produtoTamanho.produtoTamanhoId
      ) {
        this.produtosTamanho[i].quantidadeCompra = '';
        this.produtosTamanho[i].quantidadeCompra = quantidade;
      }
    }
  }

  reservar() {

    this.produtosVenda = []

    for (var i = 0; i < this.produtos.length; i++) {
    var produtoVenda = this.produtos[i].produtoTamanho.filter(x=>x.selecionado && x.quantidadeCompra != 0);

    if(produtoVenda.length == 0) continue;

    var novaVenda =  {
      valorVenda :this.produtos[i].valorVenda,
      produtoId :this.produtos[i].produtoId,
      descricao :this.produtos[i].descricao,
      produtoTamanho: produtoVenda
    };

      this.produtosVenda.push(novaVenda);

      console.log(this.produtosVenda)
  }

    this.confirmarReserva = this.produtosVenda.length > 0 ? true : false;

    this.modalService.dismissAll(this.detalheModal);
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

    if (this.formVenda.value.quantidadeDeParcelas == '') {
      this.msgInfo('Informe a quantidade de parcelas');
      return;
    }
    this.serviceVenda
      .calcularParcelas(
        this.formVenda.value.quantidadeDeParcelas,
        this.formVenda.value.preco
      )
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

  //Forçar o fechamento da modal caso volte a pagina anterior
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    this.modalService.dismissAll(this.detalheModal);
  }
}
