import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceItem, Unit, Tax } from '../model/invoice';
import { PriceCalculator, CalcRequest, ItemPrice } from '../model/price-calculator';

@Component({
  selector: 'app-single-position',
  templateUrl: './single-position.component.html',
  styleUrls: ['./single-position.component.scss']
})

export class SinglePositionComponent implements OnInit {

  @Input()
  private id: number;
  @Input()
  private position: InvoiceItem;

  @Output()
  private itemRemoved: EventEmitter<InvoiceItem> = new EventEmitter<InvoiceItem>();

  private priceCalculator: PriceCalculator = new PriceCalculator();

  constructor() { }

  ngOnInit() {
  }

  calculateGrossFromNet(net: number): void {
    console.log(this.position);
    this.position.net = net;
    const calcRequest: CalcRequest = {
      net: this.position.net,
      gross: null,
      tax: this.position.tax 
    }
    const result = this.priceCalculator.calculate(calcRequest);
    this.position.gross = result.gross;
  }

  calculateGrossFromTax(tax: string): void {
    const taxValue = parseFloat(tax)/100.0;
    this.position.tax = taxValue;
    const calcRequest: CalcRequest = {
      net: this.position.net,
      gross: null,
      tax: this.position.tax 
    }
    const result = this.priceCalculator.calculate(calcRequest);
    this.position.gross = result.gross;
  }

  calculateNetFromGross(gross: number): void {
    this.position.gross = gross;
    const calcRequest: CalcRequest = {
      net: null,
      gross: this.position.gross,
      tax: this.position.tax 
    }
    const result = this.priceCalculator.calculate(calcRequest);
    this.position.net = result.net;
  }

  remove(): void {
    this.itemRemoved.next(this.position);
  }

  units(): Array<string> {
    return Object.values(Unit);
  }

  taxes(): Array<string> {
    return Object.values(Tax).filter(tax => typeof tax === 'number').map(tax => {
      return `${tax*100.0}%`;
    })
  }

  currentTaxValue(): string {
    return `${this.position.tax*100.0}%`;
  }

}