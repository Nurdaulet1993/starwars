import { Film } from '@app/films/film.model';

export interface FilmsState {
  films: Film[];
  search?: string;
  loading: boolean;
}
