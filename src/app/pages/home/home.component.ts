import { Component, OnInit } from '@angular/core';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { Router } from '@angular/router';
import { ServiceVendaService } from 'src/app/service/service-venda.service';
import { VendaModel } from 'src/app/model/VendaModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produtos: ProdutoModel[] = [];
  vendas: VendaModel[] = [];
  loading: boolean = false;
  exibirAbaProduto: boolean = true;

  constructor(
    public serviceProduto: ServiceProdutoService,
    public serviceVenda: ServiceVendaService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.obterProdutos();
    this.obterVendas();
  }

  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: ProdutoModel[]) => {
        this.produtos = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  obterVendas() {
    this.serviceVenda.obterVendas().subscribe(
      (result: VendaModel[]) => {
        this.vendas = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  logout() {
    this.router.navigate(['']);
  }

  trocarAba(aba) {
    this.exibirAbaProduto = aba == 1 ? true : false;
  }
}
