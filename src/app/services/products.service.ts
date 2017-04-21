import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Product } from '../objects/product';
import { Logger } from '@nsalaun/ng-logger';

import { ProductSearchHelper } from '../objects/productSearchHelper';

@Injectable()
export class ProductsService {
    private baseUrl: string = 'http://localhost:4300/api';

    constructor(private http: Http,
                private logger: Logger) {}

    // TODO: [improve] write a unit test to prevent wrong url variation
    getAll(searchCriteria:ProductSearchHelper): Observable<Product[]> {
        this.logger.info("ProductsService.getAll(sort)", searchCriteria);

        var url = `${this.baseUrl}/product`;

        if(searchCriteria){
            url += "/sort";

            if(searchCriteria.propCriteria &&
                    searchCriteria.propCriteria){
                url += `/${searchCriteria.ascDirection? 'asc': 'desc'}`;
            }

            if(searchCriteria.propCriteria)
                url += `/${searchCriteria.propCriteria}`;
        }

        let product$ = this.http
            .get(url, { headers: this.getHeaders() })
            .map(mapProducts)
            .catch(handleError);

        return product$;
    }

    get(id: number): Observable<Product> {
        this.logger.info("ProductsService.get(id)", id);
        
        let Product$ = this.http
            .get(`${this.baseUrl}/product/id/${id}`, { headers: this.getHeaders() })
            .map(mapProduct);
        return Product$;
    }

    private getHeaders() {
        let headers = new Headers();

        return headers;
    }
}

function mapProduct(response: Response): Product {
    return toProduct(response.json()[0]);
}

function mapProducts(response: Response): Product[] {
    return response.json().map(toProduct)
}

function toProduct(r: any): Product {
    let product = <Product>({
        id: r.id,
        name: r.name,
        description: r.description,
        price: r.price,
        currency: r.currency
    });
    return product;
}

function handleError(error: any) {
    let errorMsg = error.message || `General error retrieving our server. Try again later!`
    return Observable.throw(errorMsg);
}