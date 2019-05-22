import { Component, OnInit } from '@angular/core';
import { InvoiceItem, InvoiceItemFactory } from '../model/invoice';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceItems: InvoiceItem[] = [];
  invoiceItemFactory: InvoiceItemFactory;

  constructor() {
    this.invoiceItemFactory = new InvoiceItemFactory();
  }

  ngOnInit() {
  }

  addInvoiceItem(): void {
    this.invoiceItems.push(this.invoiceItemFactory.createNewInvoiceItem());
  }

  removeItem(item: InvoiceItem): void {
    this.invoiceItems = this.invoiceItems.filter(i => i !== item);
  }

}
