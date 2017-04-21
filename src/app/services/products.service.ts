import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Product } from '../objects/product';
import { Logger } from '@nsalaun/ng-logger';

@Injectable()
export class ProductsService {
    private baseUrl: string = 'http://localhost:4300/api';

    constructor(private http: Http,
                private logger: Logger) {}

    getAll(sort): Observable<Product[]> {
        this.logger.info("ProductsService.getAll(sort)", sort);

        var url = `${this.baseUrl}/product`;

        if (sort)
            url += `/sort/${sort}`;

        let product$ = this.http
            .get(url, { headers: this.getHeaders() })
            .map(mapProducts)
            .catch(handleError);
        return product$;
    }

    get(id: number): Observable<Product> {
        this.logger.info("ProductsService.get(id)", id);
        
        let Product$ = this.http
            .get(`${this.baseUrl}/product/${id}`, { headers: this.getHeaders() })
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
    let Product = <Product>({
        id: r.id,
        name: r.name,
        description: r.description,
        price: r.price,
        currency: r.currency
    });
    return Product;
}

function handleError(error: any) {
    let errorMsg = error.message || `General error retrieving our server. Try again later!`
    return Observable.throw(errorMsg);
}