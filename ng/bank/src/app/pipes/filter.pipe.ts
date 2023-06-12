import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(transactionsArray: any[], serchTerm: string, serchType: string): any[] {
    const result: any = [];
    if (!transactionsArray || serchTerm == '' || serchType == '') {
      return transactionsArray
    }
    else {
      transactionsArray.forEach(item => {
        if (item[serchType].includes(serchTerm)) {
          result.push(item)
        }
      })
      return result
    }
  }

}
