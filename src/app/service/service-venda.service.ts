import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceVendaService {

  private header = new HttpHeaders();

  constructor(public http: HttpClient) { }

  obterVendas() {
    return this.http.get(`${environment.urlApi}Venda`);
  }

  obterVendaPorId(id: number) {
    return this.http.get(`${environment.urlApi}Venda/${id}`);
  }
  obterFormasDePagamento() {
    return this.http.get(`${environment.urlApi}Venda/ObterFormaDePagamento`);
  }


  adicionarVenda(obj) {
    return this.http.post(`${environment.urlApi}Venda`, obj);
  }

  atualizarVenda(obj) {
    return this.http.put(`${environment.urlApi}Venda`, obj);
  }

  calcularVenda(obj) {
    return this.http.post(`${environment.urlApi}Venda/CalcularTotalDaVenda`, obj);
  }

}
