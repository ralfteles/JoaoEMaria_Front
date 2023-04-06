import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { produtoEntradaModel } from 'src/app/model/produtoEntradaModel';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServicelogService } from 'src/app/service/servicelog.service';

@Component({
  selector: 'app-logentrada',
  templateUrl: './logentrada.component.html',
  styleUrls: ['./logentrada.component.css']
})
export class LogentradaComponent implements OnInit {

  produtosEntrada: produtoEntradaModel;
  produtosEntradaDetalhe:  produtoEntradaModel;
  nomeProduto: string;
  searchText;
  searchDetalheText;

  @ViewChild('detalheModal') detalheModal : TemplateRef<any>;

  constructor(private modalService: NgbModal,
    private serviceLog: ServicelogService) { }

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos() {
    this.serviceLog.obterLogDeEntrada().subscribe(
      (result: any) => {
        this.produtosEntrada = result;
      },
      (error) => {
        console.log('Erro ao obter Log de entrada')
      }
    );
  }

  openModal(produto){
    this.serviceLog.obterLogDeEntradaDetail(produto.produtoId).subscribe(
      (result: any) => {
        this.nomeProduto = produto.nome;
        this.produtosEntradaDetalhe = result;
        this.modalService.open(this.detalheModal, { size: 'xl' });
      },
      (error) => {
        console.log('Erro ao obter Log de entrada')
      }
    );

  }

}
