import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvoiceItem, Unit, Tax } from '../model/invoice';
import { PriceCalculator, CalcRequest, ItemPrice } from '../model/price-calculator';
import { ItemCatalog } from '../model/item-catalog/item-catalog';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, tap, map, retry } from 'rxjs/operators';
import { Item } from '../model/item-catalog/item';

interface ItemSuggestion {
  name: string;
  label: string;
}

@Component({
  selector: 'app-single-position',
  templateUrl: './single-position.component.html',
  styleUrls: ['./single-position.component.scss']
})

export class SinglePositionComponent implements OnInit {

  readonly WAIT_TIME_BEFORE_SEARCH = 400;

  @Input()
  private id: number;
  @Input()
  private position: InvoiceItem;

  @Output()
  private itemRemoved: EventEmitter<InvoiceItem> = new EventEmitter<InvoiceItem>();

  private priceCalculator: PriceCalculator = new PriceCalculator();

  private searchQuery = new Subject<string>();

  private searchResult = this.searchQuery.pipe(
    debounceTime(this.WAIT_TIME_BEFORE_SEARCH),
    switchMap( q => this.itemsCatalog.items(q)),
    tap(data => console.log(data)),
    map(data => this.toAnotherForm(data)),
    tap(data => console.log(data)),
    retry(3),
  );
	
	suggestions: ItemSuggestion[] = [];

  constructor(
    private itemsCatalog: ItemCatalog
  ) { }

  ngOnInit() {
    this.searchResult.subscribe((items) => {
      this.suggestions = items;
    });
  }

  handleAutocompleteName($event: any): void {
    this.searchQuery.next($event.target.value);
  }
  
  toAnotherForm(data: Item[]): ItemSuggestion[] {
    return data.map(i => {
      return {
        name: i.name,
        label: i.name
      };
    });
  }

  selectSuggestion(item: ItemSuggestion): void {
    this.position = {
      ...this.position,
      name: item.name
    };
    this.suggestions = [];
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