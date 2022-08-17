import { createAction, props } from '@ngrx/store';

export enum FilmsActionsType {
  GET_FILMS = '[FILMS API] Get all films',
}

export const getFilms = createAction(
  FilmsActionsType.GET_FILMS
)
