import { Pipe, PipeTransform } from '@angular/core';
import { Film } from '@app/films/film.model';

@Pipe({
  name: 'titleFilter'
})
export class TitleFilterPipe implements PipeTransform {

  transform(value: Film[], title: string): Film[] {
    if (!title) return value;

    return value.filter(item => item.properties.title.toLowerCase().includes(title.toLowerCase()));
  }

}
