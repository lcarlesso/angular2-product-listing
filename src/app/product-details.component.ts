import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Response } from '@angular/http';

import { Product } from './objects/product';
import { ProductsService } from './services/products.service';

@Component({
  selector: 'product-details',
  template: `
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Product
                    <small>detail</small>
                </h1>
            </div>
        </div>
        <div class="row" *ngIf="product">
            <div class="col-md-8">
                <img class="img-responsive" src="http://placehold.it/750x500" alt="">
            </div>
            <div class="col-md-4">
                <h3>{{product.name}}</h3>
                <p>{{product.description}}</p>
                <h3>Price</h3>
                <p>{{product.price}}{{product.currency}}</p>
            </div>
        </div>
`
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
    product: Product;
    routerSub: any;
    
    constructor(private productService: ProductsService,
                private route: ActivatedRoute,
                private router: Router){
    }

    ngOnInit(){
        this.routerSub = this.route.params.subscribe(params => {
          let id = Number.parseInt(params['id']);
          this.productService
            .get(id)
            .subscribe(p => this.product = p);
        });
    }

    ngOnDestroy(){
        this.routerSub.unsubscribe();
    }
}
