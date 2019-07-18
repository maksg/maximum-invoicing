import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceSummary, InvoiceItem } from '../model/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})

export class InvoiceComponent implements OnInit {

  invoice: Invoice;
  invoiceSummary: InvoiceSummary;

  constructor() { }

  ngOnInit() {
    this.invoice = {
      general: {
        issueDate: "",
        number: "",
        dueDate: ""
      },
      client: {
        companyName: "",
        address: "",
        zipCode: "",
        country: "",
        nip: ""
      },
      items: []
    }

    this.invoiceSummary = this.recalculateSummery(this.invoice);
  }

  recalculateSummery(invoice: Invoice): InvoiceSummary {
    const gross = invoice.items.map(i => i.gross).reduce((sum, i) => sum + i, 0);
    const net = invoice.items.map(i => +i.net).reduce((sum, i) => sum + i, 0);

    return {
      gross: gross,
      net: net,
      tax: this.round(gross - net, 2)
    }
  }
  
	private round(price: number, digits: number): number {
	  const rounded = Number((Math.round(price * 100) / 100).toFixed(digits));
	  return rounded;
	}
	
	updateItems(items) {
    this.invoice.items = items;
	  this.invoiceSummary = this.recalculateSummery(this.invoice);
	}

}
