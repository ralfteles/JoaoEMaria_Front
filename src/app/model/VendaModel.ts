export class VendaModel {
    dataDaVendaFormat: string;
    dataDaVenda: Date;
    vendaId: any;
    cliente: string;
    quantidade: number;
    preco: number;
    formaPagamento: string;
    observacao: string;
    produtosNaVenda: any[];
    parcelasNaVenda: any[];
  
    constructor() { }
  }