import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../objects/product';

@Pipe({
    name: 'filterproductsattr',
    pure: false
})
export class FilterProductsByAttributes implements PipeTransform {

    // TODO: space for improvement on args object.
    transform(items: Product[], args: any[]): any {
        var filter = args['search'];

        if (items == undefined) {
            args['count'] = 0;
            return;
        }

        if (!items || !filter) {
            args['count'] = items.length;
            return items;
        }

        var filtered = items.filter(item => this.checkFilter(item, filter));
        args['count'] = filtered.length;
        
        return filtered;
    }

    checkFilter(item, filter):boolean{        
        var search = item.name + " " + item.description + " " + item.price + " " + item.currency;
        
        search = search.toLowerCase();
        filter = filter.toLowerCase();

        return search.indexOf(filter) !== -1;
    }
}