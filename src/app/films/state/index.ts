import * as AppState from '@app/state/app.state';
import { FilmsState } from '@app/films/state/films-state.model';
import { createSelector } from '@ngrx/store';

export interface State extends AppState.State {
  films: FilmsState
}

export const selectFilmsState = (state: State) => state.films;

export const selectFilms = createSelector(
  selectFilmsState,
  state => state.films
)
