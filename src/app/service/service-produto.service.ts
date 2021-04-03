import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceProdutoService {
  private header = new HttpHeaders();
  constructor(public http: HttpClient) {}

  obterProdutos() {
    return this.http.get(`${environment.urlApi}Produto`);
  }

  obterProdutoPorId(id:number) {
    return this.http.get(`${environment.urlApi}Produto/${id}`);
  }

  adicionarProduto(obj) {
    return this.http.post(`${environment.urlApi}Produto`, obj);
  }

  atualizarProduto(obj) {
    return this.http.put(`${environment.urlApi}Produto`, obj);
  }
}
