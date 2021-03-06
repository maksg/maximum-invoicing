import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { SinglePositionComponent } from './single-position/single-position.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ItemCatalog } from './model/item-catalog/item-catalog';
import { LocalItemCatalog } from './model/item-catalog/local-item-catalog';
import { HttpItemCatalog } from './model/item-catalog/http-item-catalog';
import { FormsModule } from '@angular/forms';
import { ClientBoxComponent } from './client-box/client-box.component';
import { InvoicePositionsComponent } from './invoice-positions/invoice-positions.component';
import { GeneralBoxComponent } from './general-box/general-box.component';
import { InvoiceSummaryComponent } from './invoice-summary/invoice-summary.component';

@NgModule({
  declarations: [InvoiceComponent, SinglePositionComponent, ClientBoxComponent, InvoicePositionsComponent, GeneralBoxComponent, InvoiceSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    InvoiceComponent
  ],
  providers: [
    // {
    //   provide: ItemCatalog, useFactory: () => new LocalItemCatalog()
    // }
    {
      provide: ItemCatalog, useFactory: (http: HttpClient) => new HttpItemCatalog(http), deps: [HttpClient]
    }
  ]
})
export class InvoicingModule { }
