import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../objects/product';

@Pipe({
    name: 'filterprodattr',
    pure: false
})
export class FilterProductsByAttributes implements PipeTransform {
    transform(items: Product[], filter: string): any {
        if (!items || !filter) {
            return items;
        }

        return items.filter(item => this.checkFilter(item, filter));
    }

    checkFilter(item, filter):boolean{        
        var search = item.name + " " + item.description + " " + item.price + " " + item.currency;
        
        search = search.toLowerCase();
        filter = filter.toLowerCase();

        return search.indexOf(filter) !== -1;
    }
}