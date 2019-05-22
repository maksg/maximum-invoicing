import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice/invoice.component';
import { SinglePositionComponent } from './single-position/single-position.component';

@NgModule({
  declarations: [InvoiceComponent, SinglePositionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    InvoiceComponent
  ]
})
export class InvoicingModule { }
