import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal(produto){
    this.produto = produto
    this.produtoTamanho = produto.produtoTamanho;
    this.modalService.open(this.detalheModal, { size: 'xl' });
  }  
  

}
