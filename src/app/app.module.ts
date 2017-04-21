import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { NgLoggerModule, Level } from '@nsalaun/ng-logger';

import { AppComponent }  from './app.component';
import { ProductListComponent } from './product-list.component';
import { ProductDetailsComponent } from './product-details.component';
import { FilterProductsByAttributes } from './utils/filter.pipe';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule, NgLoggerModule.forRoot(Level.LOG)],
  declarations: [ AppComponent, ProductListComponent, ProductDetailsComponent, FilterProductsByAttributes,],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
