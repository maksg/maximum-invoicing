import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { SinglePositionComponent } from './single-position/single-position.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemCatalog } from './model/item-catalog/item-catalog';
import { LocalItemCatalog } from './model/item-catalog/local-item-catalog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InvoiceComponent, SinglePositionComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    InvoiceComponent
  ],
  providers: [
    {
      provide: ItemCatalog, useFactory: () => new LocalItemCatalog()
    }
  ]
})
export class InvoicingModule { }
