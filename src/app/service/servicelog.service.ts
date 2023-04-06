import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicelogService {
  private header = new HttpHeaders();

  constructor(public http: HttpClient) {}

  obterLogDeEntrada() {
    return this.http.get(`${environment.urlApi}produtoEntrada`);
  }

  obterLogDeEntradaDetail(produtoId) {
    return this.http.get(`${environment.urlApi}produtoEntrada/${produtoId}`);
  }
}
