import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceItem, InvoiceItemFactory } from '../model/invoice';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.scss']
})

export class InvoicePositionsComponent implements OnInit {
	
  @Input()
  private invoiceItems: InvoiceItem[];

  @Output()
  itemsChanged: EventEmitter<InvoiceItem[]> = new EventEmitter();
  
  private invoiceItemFactory: InvoiceItemFactory;

  constructor() {
    this.invoiceItemFactory = new InvoiceItemFactory();
  }

  ngOnInit() {
  }

  addInvoiceItem(): void {
    this.invoiceItems.push(this.invoiceItemFactory.createNewInvoiceItem());
    this.itemsChanged.next(this.invoiceItems);
  }

  removeItem(item: InvoiceItem): void {
    this.invoiceItems = this.invoiceItems.filter(p => p.id !== item.id);
    this.itemsChanged.next(this.invoiceItems);
  }

  handlePositionChanged(positon: InvoiceItem): void {
    this.itemsChanged.next(this.invoiceItems);
  }

}
