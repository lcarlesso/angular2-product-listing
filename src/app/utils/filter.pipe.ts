import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../objects/product';

@Pipe({
    name: 'filterproductsattr',
    pure: false
})
export class FilterProductsByAttributes implements PipeTransform {

    transform(items: Product[], arg: FilterSearchData): any {
        if (items == undefined) {
            arg.count = 0;
            return;
        }

        if (!items || !arg.search) {
            arg.count = items.length;
            return items;
        }

        var filtered = items.filter(item => this.checkFilter(item, arg.search));
        arg.count = filtered.length;

        return filtered;
    }

    checkFilter(item, filter):boolean{
        filter = filter.toLowerCase();  
        return item.name.toLowerCase().indexOf(filter) !== -1 || 
                item.description.toLowerCase().indexOf(filter) !== -1 ||
                String(item.price).indexOf(filter) !== -1 ||
                item.currency.toLowerCase().indexOf(filter) !== -1;
    }
}

export interface FilterSearchData{
    search: string;
    count: number;
}