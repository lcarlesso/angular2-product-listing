import { Component, OnInit } from '@angular/core';
import { Product } from './objects/product';
import { ProductsService } from './services/products.service';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'product-list',
  template: `

    <div class="row" >
        <div class="col-lg-12" *ngIf="isLoading && !errorMessage">
            <h3 class="page-header">Loading our products!!! Retrieving data...</h3>
        </div>
        <div class="col-lg-6">
            <h3 class="page-header">All Products</h3>
        </div>
        <div class="col-lg-6">
            <input type="text" [ngModel]="search" (ngModelChange)="search = ($event)" />

            <label>Order by</label>
            <div class="btn-block">
                <a (click)="loadData('name')" class="btn btn-primary pull-right">Name</a>
                <a (click)="loadData('price')" class="btn btn-primary pull-right">Price</a>
                <a (click)="loadData('currency')" class="btn btn-primary pull-right">Currency</a>    
            </div>
        </div>
    </div>  

    <div class="row" >
      <div class="col-sm-3 col-xs-6" *ngFor="let product of products | filterprodattr:search">
          <a href="#" [routerLink]="['/products', product.id]">
              {{product.name}}
              <img class="img-responsive portfolio-item" src="http://placehold.it/500x300" alt="">
          </a>
      </div>

      <div class="col-lg-12" *ngIf="errorMessage">
          <h3 class="page-header">{{errorMessage}}</h3>
      </div>
  </div>
  `
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  search:string = '';

  constructor(private productService : ProductsService,
                private logger: Logger){ }

  ngOnInit(){
    this.loadData(null);
  }

  loadData(way){
    this.logger.info("ProductListComponent.loadData(way)", way);
    
    this.productService
      .getAll(way)
      .subscribe(
         p => this.products = p,
         e => this.errorMessage = e,
         () => this.isLoading = false);
  }
}
