import { Component, OnInit } from '@angular/core';
import { ServiceProdutoService } from 'src/app/service/service-produto.service';
import { ProdutoModel } from 'src/app/model/produtoModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  produtos: ProdutoModel[] = [];
  loading: boolean = false;

  constructor(
    public serviceProduto: ServiceProdutoService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.obterProdutos();
  }

  obterProdutos() {
    this.serviceProduto.obterProdutos().subscribe(
      (result: ProdutoModel[]) => {
        this.produtos = result;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        //this.router.navigate(['']);
      }
    );
  }

  logout() {
    this.router.navigate(['']);
  }
}
