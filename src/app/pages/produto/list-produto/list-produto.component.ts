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

  @Input() produtos = ProdutoModel;

  produto: ProdutoModel;
  produtoTamanho: any;

  constructor(private modalService: NgbModal,
    public serviceProduto: ServiceProdutoService) { }

  ngOnInit(): void {
  }

  openModal(produto){
    this.produto = produto
    this.produtoTamanho = produto.produtoTamanho;
    this.modalService.open(this.detalheModal, { size: 'xl' });
  }  
  
  remover(produtoId: any) {

    this.serviceProduto.removerProduto(produtoId).subscribe(
      (res: any) => {
        this.produto = new ProdutoModel;
        this.obterProdutos();
      },
      (error) => {
        //this.salvando = false;
      }
    );
  }

  //NÃO SEI SE FUNCIONA E SE É A MELHOR PRATICA, MAS ADICIONEI PARA TESTAR
  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: any) => {
        this.produto = result;
      },
      (error) => {
      }
    );
  }

}
