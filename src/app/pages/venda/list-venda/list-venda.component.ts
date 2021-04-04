import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VendaModel } from 'src/app/model/VendaModel';

@Component({
  selector: 'app-list-venda',
  templateUrl: './list-venda.component.html',
  styleUrls: ['./list-venda.component.css']
})
export class ListVendaComponent implements OnInit {
  
  @ViewChild('detalheModal') detalheModal : TemplateRef<any>;

  @Input() vendas = VendaModel;
  venda: VendaModel;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }


  openModal(venda){
    this.venda = venda
    this.modalService.open(this.detalheModal, { size: 'xl' });
  }  

}
