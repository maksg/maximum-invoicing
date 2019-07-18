import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { HeroModule } from './hero/hero.module';
import { InvoicingModule } from './invoicing/invoicing.module';
import { FormsModule } from '@angular/forms';
// import { InvoiceSummaryComponent } from './invoicing/invoice-summary/invoice-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
    // InvoiceSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeroModule,
    InvoicingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
