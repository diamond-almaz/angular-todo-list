import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from './app.component';

@Pipe({
  name: 'todosFilter'
})
export class TodosFilterPipe implements PipeTransform {

  transform(array: ITodo[], searchText: string) {
    if (array.length === 0 || searchText === '') {
      return array;
    }
    return array.filter((item) => item.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }

}
