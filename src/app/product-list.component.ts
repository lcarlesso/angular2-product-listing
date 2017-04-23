import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/core';
import { Product } from './objects/product';
import { ProductSearchHelper } from './objects/productSearchHelper';
import { ProductsService } from './services/products.service';
import { Logger } from '@nsalaun/ng-logger';
import { FilterSearchData } from './utils/filter.pipe';

@Component({
    selector: 'product-list',
    template: `
    <div class="col-md-3">
        <div class="form-group">
            <h3 class="page-header">Sort by</h3>
            <div class="">
                <input class="form-control list-group-item" type="text" [ngModel]="filterSearch.search" (ngModelChange)="filterSearch.search = ($event)" />
                <div class="sortbuttons">
                    <a (click)="loadData('name')" class="btn btn-primary">
                        <i class="fa" [ngClass]="[search ? search.propCriteria === 'name' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']" aria-hidden="true"></i>
                        Name
                    </a>
                    <a (click)="loadData('price')" class="btn btn-primary">
                        <i class="fa" [ngClass]="[search ? search.propCriteria === 'price' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']" aria-hidden="true"></i>
                        Price
                    </a>
                    <a (click)="loadData('currency')" class="btn btn-primary">
                        <i class="fa" [ngClass]="[search ? search.propCriteria === 'currency' ? search.ascDirection ? 'fa-caret-down' : 'fa-caret-up' : '' : '']" aria-hidden="true"></i>
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
            <div class="col-sm-6 col-lg-4 col-md-6" 
                *ngFor="let product of products | filterproductsattr: filterSearch"
                [@shrinkOut]="'in'">
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
        <div>{{filterSearch.search ? 'Your search returned' : 'Displaying'}} {{filterSearch?.count}} products!</div>
    </div>
  `,
    animations: [
        trigger('shrinkOut', [
            state('in', style({height: '*'})),
            transition('* => void', [
                style({transform:'scale(1)'}),
                animate(250, style({transform:'scale(0)'}))
            ]),
            transition('void => *', [
                style({transform:'scale(0)'}),
                animate(250, style({transform:'scale(1)'}))
            ]),
        ])
    ]
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    errorMessage: string = '';
    isLoading: boolean = true;

    filterSearch: FilterSearchData = <FilterSearchData>({count:0, search:''});
    apiSearch: ProductSearchHelper;

    constructor(private productService: ProductsService, private logger: Logger) { }

    ngOnInit() {
        this.loadData(null);
    }

    loadData(way) {
        this.logger.info("ProductListComponent.loadData(way)", way);

        if (way) {
            this.apiSearch = <ProductSearchHelper>({
                ascDirection: this.apiSearch ? !this.apiSearch.ascDirection : true,
                propCriteria: way
            });
        }

        this.productService
            .getAll(this.apiSearch)
            .subscribe(
                p => {this.products = p;
                    this.filterSearch.count = p.length},
                e => this.errorMessage = e,
                () => this.isLoading = false);
    }
}
