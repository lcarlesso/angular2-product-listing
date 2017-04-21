import { Component, OnInit } from '@angular/core';
import { Product } from './objects/product';
import { ProductSearchHelper } from './objects/productSearchHelper';
import { ProductsService } from './services/products.service';
import { Logger } from '@nsalaun/ng-logger';

@Component({
  selector: 'product-list',
  template: `
    <div class="col-md-3">

        <div class="form-group">
  
            <p class="lead">Sort by</p>
            <div class="">
                <input class="form-control list-group-item" type="text" [ngModel]="bindSearch" (ngModelChange)="bindSearch = ($event)" />
                <div class="sortbuttons">
                    <a (click)="loadData('name')" 
                        class="btn btn-primary fa"
                        [ngClass]="[search ? search.propCriteria === 'name' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']">
                        Name
                    </a>
                    <a (click)="loadData('price')" 
                        class="btn btn-primary fa"
                        [ngClass]="[search ? search.propCriteria === 'price' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']">
                        Price
                    </a>
                    <a (click)="loadData('currency')" 
                        class="btn btn-primary fa"
                        [ngClass]="[search ? search.propCriteria === 'currency' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']">
                        Currency
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="col-md-9">
        <div class="row" *ngIf="isLoading && !errorMessage">
            <div class="col-lg-12" >
                <h3 class="page-header">Loading our products!!! Retrieving data...</h3>
            </div>
        </div>
        <div class="col-lg-12" *ngIf="errorMessage">
            <h3 class="page-header">{{errorMessage}}</h3>
        </div>
        <div class="row" *ngIf="!isLoading && !errorMessage">
            <div class="col-md-12">
                <h3 class="page-header">All Products</h3>
            </div>
        </div>
        <div class="row" *ngIf="!isLoading && !errorMessage">
            <div class="col-sm-6 col-lg-4 col-md-6" *ngFor="let product of products | filterprodattr:bindSearch">
                <div class="thumbnail">
                    <img src="http://placehold.it/320x150" alt="">
                    <div class="caption">
                        <h4 class="pull-right"><small>{{product.currency}}</small> {{product.price}}</h4>
                        <h4><a href="#" [routerLink]="['/products', product.id]">{{product.name}}</a>
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>

  `
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  bindSearch:string = '';
  search:ProductSearchHelper;

  constructor(private productService : ProductsService, private logger: Logger){ }

  ngOnInit(){
    this.loadData(null);
  }

  loadData(way){
    this.logger.info("ProductListComponent.loadData(way)", way);
    
    if(way){
        this.search = <ProductSearchHelper>({
            ascDirection : this.search?!this.search.ascDirection:true,
            propCriteria : way
        });
    }
    
    this.productService
      .getAll(this.search)
      .subscribe(
         p => this.products = p,
         e => this.errorMessage = e,
         () => this.isLoading = false);
  }
}
