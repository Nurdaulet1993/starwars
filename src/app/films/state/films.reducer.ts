import { Action, createReducer, on } from '@ngrx/store';
import { FilmsState } from '@app/films/state/films-state.model';
import { FilmsApiActions, FilmsActions } from './actions';

export const initialState: FilmsState = {
  films: [],
  loading: false
}

export const filmsReducer = createReducer(
  initialState,
  on(FilmsActions.getFilms, state => ({...state, loading: true })),
  on(FilmsApiActions.getFilmsSuccess, FilmsApiActions.getFilmsFail, state => ({...state, loading: false })),
  on(FilmsApiActions.getFilmsSuccess, (state, { films }) => ({ ...state, films }))
)
