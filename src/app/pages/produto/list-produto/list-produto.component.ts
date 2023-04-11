import {
  Component,
  OnInit,
  Input,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css'],
})
export class ListProdutoComponent implements OnInit {
  @ViewChild('detalheModal') detalheModal: TemplateRef<any>;

  produto: ProdutoModel;
  tamanhoProduto: any;
  produtos: any = [];
  exibirMensagem: boolean = false;
  searchText;

  constructor(
    private modalService: NgbModal,
    public serviceProduto: ServiceProdutoService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  openModal(produto) {
    this.produto = produto;
    this.tamanhoProduto = produto.tamanhoProduto;
    this.modalService.open(this.detalheModal, { size: 'xl' });
  }

  remover(produtoId: any) {
    this.serviceProduto.removerProduto(produtoId).subscribe(
      (res: any) => {
        this.obterProdutos();
      },
      (error) => {}
    );
  }

  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: any) => {
        for (var i = 0; i < result.length; i++) {
          let objectURL = 'data:image/png;base64,' + result[i].imagemBit;
          let produto = {
            imagem: this.sanitizer.bypassSecurityTrustUrl(objectURL),
            produtoId: result[i].produtoId,
            nome: result[i].nome,
            valorVenda: result[i].valorVenda,
            tamanhoProduto: result[i].tamanhoProduto,
            cor: result[i].cor,
            marca: result[i].marca,
            precoCusto: result[i].precoCusto,
            promocaoText: result[i].promocaoText,
          };
          this.produtos.push(produto);
        }
      },
      (error) => {}
    );
  }
}
