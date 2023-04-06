import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';

@Component({
  selector: 'app-list-produto',
  templateUrl: './list-produto.component.html',
  styleUrls: ['./list-produto.component.css']
})
export class ListProdutoComponent implements OnInit {

  @ViewChild('detalheModal') detalheModal : TemplateRef<any>;

  produto: ProdutoModel;
  tamanhoProduto: any;
  produtos: any;
  exibirMensagem: boolean = false;
  searchText;

  constructor(private modalService: NgbModal,
    public serviceProduto: ServiceProdutoService) { }

  ngOnInit(): void {
    this.obterProdutos();
  }

  openModal(produto){
    this.produto = produto
    this.tamanhoProduto = produto.tamanhoProduto;
    this.modalService.open(this.detalheModal, { size: 'xl' });
  }

  remover(produtoId: any) {

    this.serviceProduto.removerProduto(produtoId).subscribe(
      (res: any) => {
        this.obterProdutos();
      },
      (error) => {
      }
    );
  }

  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: any) => {
        this.produtos = result;

        // // this.exibirMensagem = true;
        // setTimeout(()=>{
        //     this.exibirMensagem = false;
        // }, 2000);
      },
      (error) => {
      }
    );
  }

}
