import { createAction, props } from '@ngrx/store';

export enum FilmsActionsType {
  GET_FILMS = '[FILMS] Get all films',
  GET_FILM = '[FILMS] Get film',
}

export const getFilms = createAction(
  FilmsActionsType.GET_FILMS,
)

export const getFilm = createAction(
  FilmsActionsType.GET_FILM,
  props<{ id: number }>()
)
