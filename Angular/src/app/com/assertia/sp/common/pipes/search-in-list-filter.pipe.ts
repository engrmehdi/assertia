import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { isArray } from 'util';

@Pipe({
    name: 'searchInListfilter',
    pure: false
})
@Injectable()
export class SearchInListFilterPipe implements PipeTransform { 
  transform(data: any[], search: any,key:any): any {
    if(!data) return [];
    if(!search) return data;
    search = search.toLowerCase(); 
    return data.filter(item => item[key].toLowerCase().indexOf(search) !== -1);
   }
}  