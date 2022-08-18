import { createAction, props } from '@ngrx/store';

export enum FilmsActionsType {
  GET_FILMS = '[FILMS API] Get all films',
  GET_FILM = '[FILMS API] Get all films',
}

export const getFilms = createAction(
  FilmsActionsType.GET_FILMS,
)

export const getFilm = createAction(
  FilmsActionsType.GET_FILM,
  props<{ id: number }>()
)
