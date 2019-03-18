import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'runningTotal'
})
export class RunningTotalPipe implements PipeTransform {

  transform(value: any, args?: any): any {
     return value.map(v => v.CAP_AMOUNT).reduce((accumulator, currentValue) => accumulator + currentValue);
  }

}
